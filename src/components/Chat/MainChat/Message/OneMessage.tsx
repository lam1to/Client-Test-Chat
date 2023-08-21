import React, { Dispatch, FC, SetStateAction } from "react";
import { IMessage } from "../../../../types/IMessage";
import st from "../../../../styles/message.module.css";
import { useAppSelector } from "../../../../Hooks/redux";
import { IuserChat } from "../../../../types/IUser";
import { selectUser } from "../../../../store/Reducers/UserSlice";
import OneMessageSelf from "./OneMessageSelf";
import { Socket } from "socket.io-client";
import { OneMessageOther } from "./OneMessageOther";

interface PropsOneMessage {
  message: IMessage;
  userWho: IuserChat;
  setOverflow: Dispatch<SetStateAction<string>>;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  socket: Socket;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  setReplyMessage: Dispatch<SetStateAction<IMessage>>;
}

const OneMessage: FC<PropsOneMessage> = ({
  message,
  userWho,
  setOverflow,
  contentRef,
  socket,
  setEditMessage,
  setReplyMessage,
}) => {
  const user = useAppSelector(selectUser);
  return (
    <div className={st.one_message}>
      {message.content.slice(0, 6) === "admin:" ? (
        <div className={st.one_message_leftChat}>
          {message.content.slice(6)}
        </div>
      ) : user.user.id == message.userId ? (
        <OneMessageSelf
          setReplyMessage={setReplyMessage}
          message={message}
          contentRef={contentRef}
          setEditMessage={setEditMessage}
          socket={socket}
          setOverflow={setOverflow}
        />
      ) : (
        <OneMessageOther
          contentRef={contentRef}
          setReplyMessage={setReplyMessage}
          message={message}
          socket={socket}
          setOverflow={setOverflow}
          userWho={userWho}
        />
      )}
    </div>
  );
};

export default OneMessage;
