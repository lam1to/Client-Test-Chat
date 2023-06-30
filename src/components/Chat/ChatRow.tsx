import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IAllChatWithUser } from "../../types/IChat";
import { findCharForUser } from "../../http/chat.services";
import OneChat from "./OneChat";
import st from "../../styles/oneChat.module.css";

export interface PoropsChatRow {
  chats: IAllChatWithUser[];
  selectChats: IAllChatWithUser;
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
}
const ChatRow: FC<PoropsChatRow> = (chats) => {
  useEffect(() => {
    console.log("chats изменились");
  }, [chats.chats]);
  return (
    <div>
      <div className={st.chatrow}>
        {chats.chats?.map((one) => (
          <OneChat
            key={one.id}
            {...{ oneChat: one, setSelectChats: chats.setSelectChats }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatRow;
