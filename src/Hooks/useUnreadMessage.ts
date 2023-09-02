import { useEffect, useState } from "react";
import { getAllCountUnreadMessage } from "../http/message.service";
import { IMessageRead } from "../types/IMessage";
import { IUseChatSocket } from "../types/IUse";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { IChatWithUser } from "../types/IChat";
import { Socket } from "socket.io-client";
import useSound from "use-sound";
import as from "../public/notif.mp3";

export function useUnreadMessage(
  socket: Socket,
  chats: IUseChatSocket,
  selectChats: IChatWithUser,
  isLeft: boolean
) {
  const [playActive] = useSound(as, { volume: 0.4 });

  const newMessage = (content: {
    countUnreadMessage: number;
    chatId: number;
  }) => {
    if (+selectChats.id !== content.chatId) {
      playActive();
      chats.setMasT((masT) => {
        return masT.map((oneItem) => {
          if (+oneItem.id == content.chatId)
            oneItem.countUnreadMessage = content.countUnreadMessage;
          return oneItem;
        });
      });
    }
  };
  const user = useAppSelector(selectUser);
  useEffect(() => {
    if (!isLeft) {
      socket.on(`newMessage${user.user.id}`, newMessage);
      return () => {
        socket.off(`newMessage${user.user.id}`, newMessage);
      };
    }
  }, []);
}
