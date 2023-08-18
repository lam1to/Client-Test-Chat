import { useEffect, useState } from "react";
import { ILastMessage, IMessage } from "../types/IMessage";
import { lastMessage } from "../http/message.service";
import { Socket } from "socket.io-client";

export const useLastMessage = (socket: Socket) => {
  const [lastMessageChat, setLastMessageChat] = useState<ILastMessage[]>(
    [] as ILastMessage[]
  );

  useEffect(() => {
    getLastMessage();
  }, []);
  const getLastMessage = async () => {
    await lastMessage().then((data) => setLastMessageChat(data));
  };

  return {
    lastMessageChat: lastMessageChat,
    setLastMessageChat: setLastMessageChat,
  };
};
