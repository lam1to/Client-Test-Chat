import React, { FC, useEffect } from "react";
import { IChat } from "../../types/IChat";
import { IMessage } from "../../types/IMessage";
import st from "../../styles/message.module.css";
import { useAppSelector } from "../../Hooks/redux";
import { IuserChat } from "../../types/IUser";

interface PropsOneMessage {
  message: IMessage;
  userWho: IuserChat;
}

const ChatMessage: FC<PropsOneMessage> = ({ message, userWho }) => {
  const time = message.createdAt.slice(11, 16);
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    console.log(userWho);
  }, []);
  return (
    <div className={st.one_message}>
      {user.user.id == message.userId ? (
        <div className={st.message_block_self}>
          <div
            className={`${st.message_container} ${st.message_container_self}`}
          >
            <div className={st.message_content_self}>
              <div>{message.content}</div>
              <div className={st.message_content_time_self}>{time}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={st.message_block_other}>
          <div className={st.message_container}>
            {userWho && (
              <div className={st.message_who_send}>{userWho.name}</div>
            )}
            <div className={st.message_content_other}>
              <div>{message.content}</div>
              <div className={st.message_content_time}>{time}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
function useEffert(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
