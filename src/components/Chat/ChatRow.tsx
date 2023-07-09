import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { IAllChatWithUser } from "../../types/IChat";
import OneChat from "./OneChat";
import st from "../../styles/oneChat.module.css";
import { useAppSelector } from "../../Hooks/redux";
import { Socket } from "socket.io-client";

export interface PoropsChatRow {
  chats: IAllChatWithUser[];
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
  socket: Socket;
  setHidden?: Dispatch<SetStateAction<boolean>>;
}
const ChatRow: FC<PoropsChatRow> = ({
  chats,
  setSelectChats,
  socket,
  setHidden,
}) => {
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {}, [chats]);
  return (
    <div className={st.chatrow}>
      {chats?.map((one, i) => (
        <OneChat
          setHidden={setHidden}
          socket={socket}
          key={i}
          oneChat={one}
          setSelectChats={setSelectChats}
        />
      ))}
    </div>
  );
};

export default ChatRow;
