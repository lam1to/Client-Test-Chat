import React, {
  FC,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import { IMessage } from "../../types/IMessage";
import st from "../../styles/message.module.css";

import ChatMessage from "./ChatMessage";
import { IuserChat } from "../../types/IUser";

interface PropsRowImessage {
  messages: IMessage[];
  users: IuserChat[];
}
const ChatRowMessage: FC<PropsRowImessage> = ({ messages, users }) => {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={st.row_message}>
      {messages.map((oneMessage, i) => {
        const user: IuserChat = users.filter((oneUser) => {
          return oneUser.id == oneMessage.userId;
        })[0];
        return <ChatMessage userWho={user} key={i} message={oneMessage} />;
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatRowMessage;
