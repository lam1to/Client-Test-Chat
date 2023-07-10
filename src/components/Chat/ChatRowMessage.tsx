import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IMessage } from "../../types/IMessage";
import st from "../../styles/message.module.css";

import ChatMessage from "./ChatMessage";
import { IuserChat } from "../../types/IUser";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../Hooks/redux";

interface PropsRowImessage {
  messages: IMessage[];
  users: IuserChat[];
  contentRef: React.MutableRefObject<HTMLInputElement>;
  socket: Socket;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
}
const ChatRowMessage: FC<PropsRowImessage> = ({
  messages,
  users,
  contentRef,
  socket,
  setEditMessage,
}) => {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { user } = useAppSelector((state) => state.userReducer);
  const [overflow, setOverflow] = useState<string>("auto");
  const removeMessage = (idMessage: string) => {
    socket.emit("deleteMessage", {
      messageId: idMessage,
      usersId: [
        user.user.id,
        ...users.map((oneUser) => {
          return oneUser.id;
        }),
      ],
    });
  };
  return (
    <div style={{ overflow: overflow }} className={st.row_message}>
      {messages.map((oneMessage, i) => {
        const user: IuserChat = users.filter((oneUser) => {
          return oneUser.id == oneMessage.userId;
        })[0];
        return (
          <ChatMessage
            setEditMessage={setEditMessage}
            removeMessage={removeMessage}
            contentRef={contentRef}
            setOverflow={setOverflow}
            userWho={user}
            key={i}
            message={oneMessage}
          />
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatRowMessage;
