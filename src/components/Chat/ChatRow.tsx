import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { IAllChatWithUser } from "../../types/IChat";
import OneChat from "./OneChat";
import st from "../../styles/oneChat.module.css";
import { useAppSelector } from "../../Hooks/redux";

export interface PoropsChatRow {
  chats: IAllChatWithUser[];
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
}
const ChatRow: FC<PoropsChatRow> = ({ chats, setSelectChats }) => {
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    console.log("chats изменились в chatRow");
  }, []);
  return (
    <div>
      <div className={st.chatrow}>
        {chats?.map((one, i) => (
          <OneChat key={i} oneChat={one} setSelectChats={setSelectChats} />
        ))}
      </div>
    </div>
  );
};

export default ChatRow;
