import React, { FC, useEffect, useRef, useState } from "react";
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
  blackList: string;
  isLeft: boolean;
}
const MainChat: FC<PropsMainChat> = ({ chat, socket, blackList, isLeft }) => {
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
  const contentRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [editMessage, setEditMessage] = useState<IMessage>({} as IMessage);
  return (
    <div className={st.main_chat_container}>
      {chat.id ? (
        <div className={st.main_chat}>
          <MainChatHeader filter={filter} setFilter={setFilter} chat={chat} />
          <div className={st.main_chat_content}>
            {loading ? (
              <Loader />
            ) : (
              <ChatRowMessage
                setEditMessage={setEditMessage}
                socket={socket}
                contentRef={contentRef}
                users={chat.users}
                messages={FilterMessages()}
              />
            )}
          </div>
          <MainChatInput
            isLeft={isLeft}
            blackList={blackList}
            setEditMessage={setEditMessage}
            editMessage={editMessage}
            contentRef={contentRef}
            socket={socket}
            chatId={chat.id}
          />
        </div>
      ) : (
        <div className={st.emptyChat}>Чат не открыт</div>
      )}
    </div>
  );
};

export default MainChat;
