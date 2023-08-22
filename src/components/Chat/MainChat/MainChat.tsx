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
import {
  ILastMessage,
  IMessage,
  IMessageLoadingImgs,
} from "../../../types/IMessage";
import RowMessage from "./Message/RowMessage";
import Input, { ISelectFile } from "./Input/Input";
import Header from "./Header";
import Loader from "../../Loading/Loader";
import { useSocketMessage } from "../../../Hooks/useSocketMessage";
import { useTranslation } from "react-i18next";
import { useFuncMessage } from "../../../Hooks/useFuncMessage";
import { lastMessage } from "../../../http/message.service";
import { useSocketLastMessage } from "../../../Hooks/useSocketLastMessage";
import SelectForwardBlock from "./Message/SelectForwardBlock";
import { AnimatePresence, motion } from "framer-motion";
import { ModalForwardMessage } from "../../Modal/ModalForwardMessage";
import { IUseSocket } from "../Chat";

export interface PropsUseSocketMessage {
  messages: IMessage[];
  SetMessages: Dispatch<SetStateAction<IMessage[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  currentPart: number;
  setCurrentPart: Dispatch<SetStateAction<number>>;
  fetching: boolean;
  setFetching: Dispatch<SetStateAction<boolean>>;
  allPart: number;
  isNewMessage: boolean;
  setIsNewMessage: Dispatch<SetStateAction<boolean>>;
}

export interface PropsMainChat {
  chat: IChatWithUser;
  socket: Socket;
  blackList: string;
  isLeft: boolean;
  editLeftChat: (oneLeftChat: ILeftChatUser, flag: boolean) => void;
  chats: IChatWithUser[];
  blocked: IUseSocket<string>;
  blocker: IUseSocket<string>;
  setSelectChat: Dispatch<SetStateAction<IChatWithUser>>;
  leftChat: IUseSocket<string>;
}
const MainChat: FC<PropsMainChat> = ({
  chat,
  socket,
  blackList,
  isLeft,
  editLeftChat,
  chats,
  setSelectChat,
  leftChat,
  blocked,
  blocker,
}) => {
  const messages: PropsUseSocketMessage = useSocketMessage(
    socket,
    isLeft,
    chat
  );

  const [filter, setFilter] = useState<string>("");
  const [t, i18n] = useTranslation();
  const funcMessage = useFuncMessage();
  const contentRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [editMessage, setEditMessage] = useState<IMessage>({} as IMessage);
  const [replyMessage, setReplyMessage] = useState<IMessage>({} as IMessage);
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false);
  const [isLoadingImgs, setIsLoadingImgs] = useState<IMessageLoadingImgs[]>(
    [] as IMessageLoadingImgs[]
  );
  const [copySelectFile, setCopySelectFile] = useState<ISelectFile[]>(
    [] as ISelectFile[]
  );
  const [selectForwardMessage, setSelectForwardMessage] = useState<IMessage[]>(
    [] as IMessage[]
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [copySelectForwardMessage, setCopySelectForwardMessage] = useState<
    IMessage[]
  >([] as IMessage[]);
  return (
    <div className={st.main_chat_container}>
      <ModalForwardMessage
        blocked={blocked}
        blocker={blocker}
        setCopySelectForwardMessage={setCopySelectForwardMessage}
        selectForwardMessage={selectForwardMessage}
        leftChat={leftChat}
        chats={chats}
        setSelectChat={setSelectChat}
        onClose={() => {
          setVisible(false);
          setSelectForwardMessage([] as IMessage[]);
        }}
        visible={visible}
      />
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
          <AnimatePresence>
            {Object.keys(selectForwardMessage).length !== 0 && (
              <motion.div
                initial={{ position: "absolute", top: -700, opacity: 0 }}
                animate={{ position: "relative", top: 0, opacity: 1 }}
                exit={{ position: "absolute", top: -700, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SelectForwardBlock
                  setVisible={setVisible}
                  selectForwardMessage={selectForwardMessage}
                  setSelectForwardMessage={setSelectForwardMessage}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className={st.main_chat_content}>
            {messages.loading ? (
              <Loader width={50} height={50} />
            ) : (
              <RowMessage
                setSelectForwardMessage={setSelectForwardMessage}
                selectForwardMessage={selectForwardMessage}
                messages={messages}
                copySelectFile={copySelectFile}
                isLoadingMessage={isLoadingMessage}
                setEditMessage={setEditMessage}
                setReplyMessage={setReplyMessage}
                socket={socket}
                contentRef={contentRef}
                users={chat.users}
                messagesFilter={funcMessage.FilterMessages(filter, messages)}
                isLoadingImgs={isLoadingImgs}
              />
            )}
          </div>
          <Input
            setCopySelectForwardMessage={setCopySelectForwardMessage}
            copySelectForwardMessage={copySelectForwardMessage}
            setCopySelectFile={setCopySelectFile}
            setIsLoadingMessage={setIsLoadingMessage}
            isLeft={isLeft}
            blackList={blackList}
            setEditMessage={setEditMessage}
            editMessage={editMessage}
            setReplyMessage={setReplyMessage}
            replyMessage={replyMessage}
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
