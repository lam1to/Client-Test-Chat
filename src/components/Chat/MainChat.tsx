import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import st from "../../styles/mainChat.module.css";
import { IAllChatWithUser } from "../../types/IChat";
import { Socket } from "socket.io-client";
import { IMessage } from "../../types/IMessage";
import ChatRowMessage from "./ChatRowMessage";
import { getAllMessageForChat } from "../../http/chat.services";
import MainChatInput from "./MainChatInput";
import MainChatHeader from "./MainChatHeader";
import Loader from "../Loading/Loader";
import { IUseSocket } from "./Chat";
import { useSocket } from "../../Hooks/useSocket";
import { useSocketMessage } from "../../Hooks/useSocketMessage";
import { useTranslation } from "react-i18next";

export interface PropsMainChat {
  chat: IAllChatWithUser;
  socket: Socket;
  blackList: string;
  isLeft: boolean;
}
export interface PropsUseSocketMessage {
  messages: IMessage[];
  SetMessages: Dispatch<SetStateAction<IMessage[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
const MainChat: FC<PropsMainChat> = ({ chat, socket, blackList, isLeft }) => {
  const messages: PropsUseSocketMessage = useSocketMessage(
    socket,
    isLeft,
    chat
  );
  const [filter, setFilter] = useState<string>("");
  const [t, i18n] = useTranslation();
  const FilterMessages = (): IMessage[] => {
    if (filter.length > 0) {
      const filterMessages = messages.messages?.filter((oneMessage) => {
        return oneMessage.content
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase());
      });
      return filterMessages;
    }
    return messages.messages;
  };
  const contentRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [editMessage, setEditMessage] = useState<IMessage>({} as IMessage);
  return (
    <div className={st.main_chat_container}>
      {chat.id ? (
        <div className={st.main_chat}>
          <MainChatHeader filter={filter} setFilter={setFilter} chat={chat} />
          <div className={st.main_chat_content}>
            {messages.loading ? (
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
        <div className={st.emptyChat}>{t("mainChat.empty")}</div>
      )}
    </div>
  );
};

export default MainChat;
