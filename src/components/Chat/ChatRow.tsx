import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { IChatWithUser, IChat, ILeftChatUser } from "../../types/IChat";
import OneChat from "./OneChat";
import st from "../../styles/oneChat.module.css";
import { Socket } from "socket.io-client";
import { useTranslation } from "react-i18next";
import { ILastMessage } from "../../types/IMessage";

export interface PoropsChatRow {
  chats: IChatWithUser[];
  setSelectChats: Dispatch<SetStateAction<IChatWithUser>>;
  setHidden?: Dispatch<SetStateAction<boolean>>;
  lastMessageChat: ILastMessage[];
  setLastMessageChat: Dispatch<SetStateAction<ILastMessage[]>>;
}
const ChatRow: FC<PoropsChatRow> = ({
  chats,
  setSelectChats,
  setHidden,
  lastMessageChat,
}) => {
  const [t] = useTranslation();
  return (
    <div className={st.chatrow}>
      {chats.length !== 0 ? (
        chats?.map((one, i) => {
          const lastMessage = lastMessageChat.filter(
            (oneLastMessage) => oneLastMessage.chatId === one.id
          )[0];
          return (
            <OneChat
              lastMessage={lastMessage}
              setHidden={setHidden}
              key={i}
              oneChat={one}
              setSelectChats={setSelectChats}
            />
          );
        })
      ) : (
        <div className={st.chatrow_empty}>{t("chatRow.empty")}</div>
      )}
    </div>
  );
};

export default ChatRow;
