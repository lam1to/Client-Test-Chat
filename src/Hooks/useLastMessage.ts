import { useEffect, useState } from "react";
import { ILastMessage, IMessage } from "../types/IMessage";
import { lastMessage } from "../http/message.service";
import { Socket } from "socket.io-client";

export const useLastMessage = (socket: Socket) => {
  const [lastMessageChat, setLastMessageChat] = useState<ILastMessage[]>(
    [] as ILastMessage[]
  );

  const newLastMessage = (content: ILastMessage) => {
    if (content.id == "0") {
      setLastMessageChat((lastMessageChat) => [
        ...lastMessageChat.filter(
          (oneLastMessage) => oneLastMessage.chatId !== content.chatId
        ),
      ]);
    } else {
      const isExists: boolean = lastMessageChat.some(
        (one) => one.chatId === content.chatId
      );
      if (!isExists) {
        setLastMessageChat((lastMessageChat) => [...lastMessageChat, content]);
      } else {
        setLastMessageChat((lastMessageChat) => [
          ...lastMessageChat.map((oneLastMessage) => {
            if (oneLastMessage.chatId === content.chatId) {
              oneLastMessage = content;
            }
            return oneLastMessage;
          }),
        ]);
      }
    }
  };

  useEffect(() => {
    getLastMessage();
    socket.on(`newLastMessage`, newLastMessage);
    return () => {
      socket.off(`newLastMessage`, newLastMessage);
    };
  }, []);
  const getLastMessage = async () => {
    await lastMessage().then((data) => setLastMessageChat(data));
  };

  return {
    lastMessageChat: lastMessageChat,
    setLastMessageChat: setLastMessageChat,
  };
};
