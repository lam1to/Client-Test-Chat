import { Dispatch, SetStateAction, useEffect } from "react";
import { Socket } from "socket.io-client";
import { ILastMessage } from "../types/IMessage";
import { IChatWithUser } from "../types/IChat";

export const useSocketLastMessage = (
  socket: Socket,
  lastMessageChat: ILastMessage[],
  setLastMessageChat: Dispatch<SetStateAction<ILastMessage[]>>,
  chat: IChatWithUser,
  isLeft: boolean
) => {
  const newLastMessage = (content: ILastMessage) => {
    console.log("chat id - ", chat.id, "Content = ", content);
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
    if (!isLeft) {
      socket.on(`newLastMessage${chat.id}`, newLastMessage);
      return () => {
        socket.off(`newLastMessage${chat.id}`, newLastMessage);
      };
    }
  }, [chat, isLeft]);
};
