import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import {
  findAllLeftChat,
  findCharForUser,
  getAllMessageForChat,
} from "../http/chat.services";
import {
  findUserWhoBlockedMe,
  findUserWhoWasBlockedMe,
} from "../http/blockUser.services";
import { IMessage } from "../types/IMessage";
import { IChatWithUser } from "../types/IChat";

export function useSocketMessage(
  socket: Socket,
  isLeft: boolean,
  chat: IChatWithUser
) {
  const [messages, SetMessages] = useState<IMessage[]>([]);
  const message = (content: IMessage) => {
    SetMessages((messages) => {
      if (
        messages.length > 0 &&
        content.id === messages[messages.length - 1].id
      ) {
        return messages;
      }
      return [...messages, content];
    });
  };
  const messageDelete = (content: IMessage) => {
    SetMessages((messages) =>
      messages.filter((oneMessage) => {
        return oneMessage.id !== content.id;
      })
    );
  };
  const messageUpdate = (content: IMessage) => {
    SetMessages((messages) =>
      messages.map((oneMessage) =>
        oneMessage.id === content.id ? content : oneMessage
      )
    );
  };
  useEffect(() => {
    getMessages();
    if (!isLeft) {
      socket.on(`message${chat.id}`, message);
      socket.on(`messageDelete${chat.id}`, messageDelete);
      socket.on(`messageUpdate${chat.id}`, messageUpdate);
      return () => {
        socket.off(`message${chat.id}`, message);
        socket.off(`messageDelete${chat.id}`, messageDelete);
        socket.off(`messageUpdate${chat.id}`, messageUpdate);
      };
    }
  }, [chat, isLeft]);
  const [loading, setLoading] = useState<boolean>(true);
  const getMessages = async () => {
    if (chat.id) {
      await getAllMessageForChat(chat.id).then((data) => {
        SetMessages(data);
        setLoading(false);
      });
    }
  };
  return { messages, SetMessages, loading, setLoading };
}
