import React, { FC, useEffect, useState } from "react";
import st from "../../styles/mainChat.module.css";
import { IAllChatWithUser } from "../../types/IChat";
import { Socket } from "socket.io-client";
import { IMessage } from "../../types/IMessage";
import ChatRowMessage from "./ChatRowMessage";
import { getAllMessageForChat } from "../../http/chat.services";
import MainChatInput from "./MainChatInput";
import MainChatHeader from "./MainChatHeader";

export interface PropsMainChat {
  chat: IAllChatWithUser;
  socket: Socket;
}
const MainChat: FC<PropsMainChat> = ({ chat, socket }) => {
  // const dispatch = useAppDispatch();
  // const { SetMessage } = MessageSlice.actions;
  const [messages, SetMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket.on(`message${chat.id}`, (content) => {
      SetMessages((messages) => [...messages, content]);
    });
    getMessages();
    // dispatch(SetMessage(messages[messages.length - 1]));
  }, [chat]);

  const getMessages = async () => {
    if (chat.id) {
      await getAllMessageForChat(chat.id).then((data) => SetMessages(data));
    }
  };

  // dispatch(SetMessage(messages[messages.length - 1]));
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
            <ChatRowMessage users={chat.users} messages={FilterMessages()} />
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
