import { Dispatch, SetStateAction, useEffect } from "react";
import { Socket } from "socket.io-client";
import { ILastMessage } from "../types/IMessage";
import { IChatWithUser } from "../types/IChat";
import { IUseChatSocket } from "../types/IUse";

export const useSocketLastMessage = (
  socket: Socket,
  setLastMessageChat: Dispatch<SetStateAction<ILastMessage[]>>,
  chat: IChatWithUser,
  isLeft: boolean
) => {
  const newLastMessage = (content: ILastMessage) => {
    setLastMessageChat((lastMessageChat) => {
      if (content.id == "0") {
        return [
          ...lastMessageChat.filter(
            (oneLastMessage) => oneLastMessage.chatId !== content.chatId
          ),
        ];
      } else {
        const isExists: boolean = lastMessageChat.some(
          (one) => one.chatId === content.chatId
        );
        if (!isExists) {
          return [...lastMessageChat, content];
        } else {
          return [
            ...lastMessageChat.map((oneLastMessage) => {
              if (oneLastMessage.chatId === content.chatId) {
                oneLastMessage = content;
              }
              return oneLastMessage;
            }),
          ];
        }
      }
    });
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
