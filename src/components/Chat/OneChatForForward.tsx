import React, { Dispatch, FC, SetStateAction } from "react";
import st from "../../styles/oneChat.module.css";
import { IChatWithUser } from "../../types/IChat";
import { IUseSocket } from "./Chat";
import { IMessage } from "../../types/IMessage";

export interface PropsOneChatForward {
  oneChat: IChatWithUser;
  setSelectChats: Dispatch<SetStateAction<IChatWithUser>>;
  selectForwardMessage: IMessage[];
  setCopySelectForwardMessage: Dispatch<SetStateAction<IMessage[]>>;
  onClose: () => void;
}

const OneChatForForward: FC<PropsOneChatForward> = ({
  oneChat,
  setSelectChats,
  selectForwardMessage,
  setCopySelectForwardMessage,
  onClose,
}) => {
  return (
    <div
      onClick={() => {
        setCopySelectForwardMessage(selectForwardMessage);
        onClose();
        setSelectChats(oneChat);
      }}
      className={st.onechat_block}
    >
      <div className={st.onechat_block_img}>
        {oneChat.avatarUrl && <img src={`${oneChat.avatarUrl}`} />}
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
    </div>
  );
};

export default OneChatForForward;
