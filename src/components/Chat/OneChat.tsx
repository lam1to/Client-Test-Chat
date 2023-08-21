import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IChatWithUser, ILeftChatUser, LeftChat } from "../../types/IChat";
import st from "../../styles/oneChat.module.css";
import dotsImg from "../../public/more.png";
import { Socket } from "socket.io-client";
import { useOutsideClick } from "outsideclick-react";
import { useAppSelector } from "../../Hooks/redux";
import { selectUser } from "../../store/Reducers/UserSlice";
import { useTranslation } from "react-i18next";
import { ILastMessage } from "../../types/IMessage";
import { useSocketLastMessage } from "../../Hooks/useSocketLastMessage";
import { IUseSocket } from "./Chat";
import { useFuncChat } from "../../Hooks/useFuncChat";

export interface PropsOneChat {
  oneChat: IChatWithUser;
  setSelectChats: Dispatch<SetStateAction<IChatWithUser>>;
  setHidden?: Dispatch<SetStateAction<boolean>>;
  lastMessage: ILastMessage;
  socket: Socket;
  lastMessageChat: ILastMessage[];
  setLastMessageChat: Dispatch<SetStateAction<ILastMessage[]>>;
  leftChat: IUseSocket<string>;
}
const OneChat: FC<PropsOneChat> = ({
  oneChat,
  setSelectChats,
  setHidden,
  lastMessage,
  socket,
  lastMessageChat,
  setLastMessageChat,
  leftChat,
}) => {
  const funcChat = useFuncChat();
  const lastMessageSocket = useSocketLastMessage(
    socket,
    lastMessageChat,
    setLastMessageChat,
    oneChat,
    funcChat.isLeft(leftChat, oneChat)
  );
  const { user } = useAppSelector(selectUser);

  return (
    <div
      onClick={() => {
        if (setHidden) setHidden(true);
        setSelectChats(oneChat);
      }}
      className={st.onechat_block}
    >
      <div className={st.onechat_block_img}>
        {oneChat?.users && <img src={`${oneChat.users[0].avatarPath}`} />}
      </div>
      <div className={st.onechat_block_name_remove}>
        <div className={st.onechat_block_name}>
          {oneChat.type === "DM" ? (
            <div>{oneChat.users[0].name}</div>
          ) : (
            oneChat.name
          )}
        </div>
        {lastMessage && Object.keys(lastMessage).length !== 0 && (
          <div className={st.onechat_block_last_message}>
            {lastMessage.content.slice(0, 6) === "admin:" ? (
              <div className={st.onechat_block_last_message_block}>
                {lastMessage.content.slice(6, 21) + "..."}
              </div>
            ) : (
              <div className={st.onechat_block_last_message_block}>
                <div className={st.onechat_block_last_message_block_name}>
                  {lastMessage.userId === user.id ? (
                    <div>Вы:</div>
                  ) : (
                    <div>{lastMessage.name + ":"}</div>
                  )}
                </div>
                {lastMessage.contentImg &&
                Object(lastMessage.contentImg).length !== 0 ? (
                  <div>Вложение {lastMessage.contentImg.length}</div>
                ) : (
                  <div className={st.onechat_block_last_message_block_content}>
                    {lastMessage.content.length > 8 ? (
                      <div>{lastMessage.content.slice(0, 8) + "..."}</div>
                    ) : (
                      lastMessage.content
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OneChat;
