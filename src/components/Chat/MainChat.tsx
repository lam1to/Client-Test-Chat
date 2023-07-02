import React, { FC, useEffect, useState } from "react";
import st from "../../styles/mainChat.module.css";
import { IAllChatWithUser } from "../../types/IChat";
import io from "socket.io-client";
import { IMessage } from "../../types/IMessage";
import ChatRowMessage from "./ChatRowMessage";
import { useAppSelector } from "../../Hooks/redux";
import { getAllMessageForChat } from "../../http/chat.services";
import MainChatInput from "./MainChatInput";

export interface PropsMainChat {
  chat: IAllChatWithUser;
}
const socket = io("http://localhost:4200/chatSocket");
const MainChat: FC<PropsMainChat> = ({ chat }) => {
  const [messages, SetMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    socket.on(`message${chat.id}`, (content) => {
      SetMessages((messages) => [...messages, content]);
    });
    getMessages();
  }, [chat]);
  const getMessages = async () => {
    if (chat.id) {
      await getAllMessageForChat(chat.id).then((data) => SetMessages(data));
    }
    console.log("messages in mainChat = ", messages);
  };

  return (
    <div className={st.main_chat_container}>
      {chat.id ? (
        <div className={st.main_chat}>
          <div className={st.main_chat_header}>
            <div className={st.main_chat_header_name}>
              {chat.users.map((one, i) => (
                <div className={st.main_chat_header_name_block} key={i}>
                  {chat.users.length == 1
                    ? chat.type + ": " + one.name + " " + one.lastName
                    : chat.users.length - 1 !== i
                    ? chat.type + ": " + one.name + ", "
                    : one.name}
                </div>
              ))}
            </div>
          </div>
          <div className={st.main_chat_content}>
            <ChatRowMessage users={chat.users} messages={messages} />
          </div>
          <MainChatInput socket={socket} chatId={chat.id} />
        </div>
      ) : (
        <div className={st.emptyChat}>Чат не открыт</div>
      )}
    </div>
  );
};

export default MainChat;
