import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import st from "../../../styles/mainChat.module.css";
import { IChatWithUser, ILeftChatUser } from "../../../types/IChat";
import { Socket } from "socket.io-client";
import { IMessage, IMessageLoadingImgs } from "../../../types/IMessage";
import RowMessage from "./Message/RowMessage";
import { getAllMessageForChat } from "../../../http/chat.services";
import Input, { ISelectFile } from "./Input/Input";
import Header from "./Header";
import Loader from "../../Loading/Loader";
import { IUseSocket } from "../Chat";
import { useSocket } from "../../../Hooks/useSocket";
import { useSocketMessage } from "../../../Hooks/useSocketMessage";
import { useTranslation } from "react-i18next";
import { useFuncMessage } from "../../../Hooks/useFuncMessage";

export interface PropsUseSocketMessage {
  messages: IMessage[];
  SetMessages: Dispatch<SetStateAction<IMessage[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface PropsMainChat {
  chat: IChatWithUser;
  socket: Socket;
  blackList: string;
  isLeft: boolean;
  editLeftChat: (oneLeftChat: ILeftChatUser, flag: boolean) => void;
}
const MainChat: FC<PropsMainChat> = ({
  chat,
  socket,
  blackList,
  isLeft,
  editLeftChat,
}) => {
  const messages: PropsUseSocketMessage = useSocketMessage(
    socket,
    isLeft,
    chat
  );
  const [filter, setFilter] = useState<string>("");
  const [t, i18n] = useTranslation();
  const funcMessage = useFuncMessage();
  // 1
  const contentRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [editMessage, setEditMessage] = useState<IMessage>({} as IMessage);
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false);
  const [isLoadingImgs, setIsLoadingImgs] = useState<IMessageLoadingImgs[]>(
    [] as IMessageLoadingImgs[]
  );
  const [copySelectFile, setCopySelectFile] = useState<ISelectFile[]>(
    [] as ISelectFile[]
  );
  console.log("в каком статусе файлы = ", isLoadingImgs);
  return (
    <div className={st.main_chat_container}>
      {chat.id ? (
        <div className={st.main_chat}>
          <Header
            editLeftChat={editLeftChat}
            blackList={blackList}
            socket={socket}
            filter={filter}
            setFilter={setFilter}
            chat={chat}
            leftIsChat={isLeft}
          />
          <div className={st.main_chat_content}>
            {messages.loading ? (
              <Loader width={50} height={50} />
            ) : (
              <RowMessage
                copySelectFile={copySelectFile}
                isLoadingMessage={isLoadingMessage}
                setEditMessage={setEditMessage}
                socket={socket}
                contentRef={contentRef}
                users={chat.users}
                messages={funcMessage.FilterMessages(filter, messages)}
                isLoadingImgs={isLoadingImgs}
              />
            )}
          </div>
          <Input
            setCopySelectFile={setCopySelectFile}
            setIsLoadingMessage={setIsLoadingMessage}
            isLeft={isLeft}
            blackList={blackList}
            setEditMessage={setEditMessage}
            editMessage={editMessage}
            contentRef={contentRef}
            socket={socket}
            chatId={chat.id}
            isLoadingImgs={isLoadingImgs}
            setIsLoadingImgs={setIsLoadingImgs}
          />
        </div>
      ) : (
        <div className={st.emptyChat}>{t("mainChat.empty")}</div>
      )}
    </div>
  );
};

export default MainChat;
