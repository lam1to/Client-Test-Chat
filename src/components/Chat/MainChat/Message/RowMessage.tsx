import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IMessage, IMessageLoadingImgs } from "../../../../types/IMessage";
import st from "../../../../styles/message.module.css";
import ChatMessage from "./OneMessage";
import { IuserChat } from "../../../../types/IUser";
import { Socket } from "socket.io-client";
import { motion } from "framer-motion";
import OneMessage from "./OneMessage";
import Loader from "../../../Loading/Loader";
import OneMessageWithImgLoading from "./OneMessageWithImgLoading";
import { ISelectFile } from "../Input/Input";
import { PropsUseSocketMessage } from "../MainChat";

interface PropsRowImessage {
  copySelectFile: ISelectFile[];
  messages: PropsUseSocketMessage;
  users: IuserChat[];
  contentRef: React.MutableRefObject<HTMLInputElement>;
  socket: Socket;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  setReplyMessage: Dispatch<SetStateAction<IMessage>>;
  isLoadingMessage: boolean;
  isLoadingImgs: IMessageLoadingImgs[];
  messagesFilter: IMessage[];
  setSelectForwardMessage: Dispatch<SetStateAction<IMessage[]>>;
  selectForwardMessage: IMessage[];
}
const RowMessage: FC<PropsRowImessage> = ({
  messages,
  users,
  contentRef,
  socket,
  setEditMessage,
  setReplyMessage,
  isLoadingMessage,
  copySelectFile,
  isLoadingImgs,
  messagesFilter,
  setSelectForwardMessage,
  selectForwardMessage,
}) => {
  useEffect(() => {
    if (messages.isNewMessage) {
      scrollToBottom();
      messages.setIsNewMessage(false);
    }
  }, [messages]);
  useEffect(() => {
    scrollToBottom();
    messages.setIsNewMessage(false);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [overflow, setOverflow] = useState<string>("auto");
  const ref = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [scrollTop, setScrollTop] = useState<number>(0);
  useEffect(() => {
    if (!messages.fetching) {
      const el = document.getElementsByClassName(`${st.row_message}`)?.[0];
      const newHeight = el.scrollHeight;
      el?.scrollTo(0, newHeight - scrollTop);
    }
  }, [messages.fetching]);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    if (
      e.currentTarget.scrollTop === 0 &&
      messages.currentPart < messages.allPart
    ) {
      messages.setCurrentPart(messages.currentPart + 1);
      messages.setFetching(true);
      setScrollTop(e.currentTarget.scrollHeight);
    }
  };
  return (
    <div
      onScroll={scrollHandler}
      ref={ref}
      style={{ overflow: overflow }}
      className={st.row_message}
    >
      {messagesFilter.map((oneMessage, i) => {
        const user: IuserChat = users.filter((oneUser) => {
          return oneUser.id == oneMessage.userId;
        })[0];
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            key={oneMessage.id}
          >
            <OneMessage
              setSelectForwardMessage={setSelectForwardMessage}
              selectForwardMessage={selectForwardMessage}
              setReplyMessage={setReplyMessage}
              setEditMessage={setEditMessage}
              socket={socket}
              contentRef={contentRef}
              setOverflow={setOverflow}
              userWho={user}
              message={oneMessage}
            />
          </motion.div>
        );
      })}

      {/* {Object.keys(isLoadingImgs).length !== 0 &&
        isLoadingImgs[isLoadingImgs.length - 1].isLoading &&
        copySelectFile.map((oneSelectFile, i) => (
          <div key={i}>{isLoadingImgs[i].isLoading && <div>axui</div>}</div>
        ))} */}

      {isLoadingMessage && (
        <OneMessageWithImgLoading
          isLoadingImgs={isLoadingImgs}
          selectFile={copySelectFile}
          content={contentRef.current.value}
        />
      )}

      <div ref={scrollRef} />
    </div>
  );
};

export default RowMessage;
