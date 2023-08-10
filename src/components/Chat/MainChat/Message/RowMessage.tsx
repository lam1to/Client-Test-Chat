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

interface PropsRowImessage {
  copySelectFile: ISelectFile[];
  messages: IMessage[];
  users: IuserChat[];
  contentRef: React.MutableRefObject<HTMLInputElement>;
  socket: Socket;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  isLoadingMessage: boolean;
  isLoadingImgs: IMessageLoadingImgs[];
}
const RowMessage: FC<PropsRowImessage> = ({
  messages,
  users,
  contentRef,
  socket,
  setEditMessage,
  isLoadingMessage,
  copySelectFile,
  isLoadingImgs,
}) => {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [overflow, setOverflow] = useState<string>("auto");
  return (
    <div style={{ overflow: overflow }} className={st.row_message}>
      {messages.map((oneMessage, i) => {
        const user: IuserChat = users.filter((oneUser) => {
          return oneUser.id == oneMessage.userId;
        })[0];
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            key={i}
          >
            <OneMessage
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
