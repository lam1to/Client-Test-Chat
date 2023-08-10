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

export interface PropsOneChat {
  oneChat: IChatWithUser;
  setSelectChats: Dispatch<SetStateAction<IChatWithUser>>;
  setHidden?: Dispatch<SetStateAction<boolean>>;
}
const OneChat: FC<PropsOneChat> = ({ oneChat, setSelectChats, setHidden }) => {
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
      </div>
      {/* <div>{message && message.content}</div> */}
    </div>
  );
};

export default OneChat;
