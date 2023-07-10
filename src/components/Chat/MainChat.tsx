import React, { FC, useEffect, useState } from "react";
import st from "../../styles/mainChat.module.css";
import { IAllChatWithUser } from "../../types/IChat";
import { Socket } from "socket.io-client";
import { IMessage } from "../../types/IMessage";
import ChatRowMessage from "./ChatRowMessage";
import { getAllMessageForChat } from "../../http/chat.services";
import MainChatInput from "./MainChatInput";
import MainChatHeader from "./MainChatHeader";
import Loader from "../Loading/Loader";

export interface PropsMainChat {
  chat: IAllChatWithUser;
  socket: Socket;
}
const MainChat: FC<PropsMainChat> = ({ chat, socket }) => {
  const [messages, SetMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    getMessages();
    socket.on(`message${chat.id}`, (content: IMessage) => {
      SetMessages((messages) => {
        if (
          messages.length > 0 &&
          content.id === messages[messages.length - 1].id
        ) {
          return messages;
        }
        return [...messages, content];
      });
    });
  }, [chat]);
  const [loading, setLoading] = useState<boolean>(true);
  const getMessages = async () => {
    if (chat.id) {
      await getAllMessageForChat(chat.id).then((data) => {
        SetMessages(data);
        setLoading(false);
      });
    }
  };
  const [filter, setFilter] = useState<string>("");

  const FilterMessages = (): IMessage[] => {
    if (filter.length > 0) {
      const filterMessages = messages?.filter((oneMessage) => {
        return oneMessage.content
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase());
      });
      return filterMessages;
    }
    return messages;
  };

  return (
    <div className={st.main_chat_container}>
      {chat.id ? (
        <div className={st.main_chat}>
          <MainChatHeader filter={filter} setFilter={setFilter} chat={chat} />
          <div className={st.main_chat_content}>
            {loading ? (
              <Loader />
            ) : (
              <ChatRowMessage users={chat.users} messages={FilterMessages()} />
            )}
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
