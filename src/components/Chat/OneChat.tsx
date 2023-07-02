import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { IAllChatWithUser } from "../../types/IChat";
import st from "../../styles/oneChat.module.css";

export interface PropsOneChat {
  oneChat: IAllChatWithUser;
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
}
const OneChat: FC<PropsOneChat> = (oneChat) => {
  return (
    <button
      onClick={() => oneChat.setSelectChats(oneChat.oneChat)}
      className={st.onechat_container}
    >
      <div className={st.onechat}>
        <div className={st.onechat_block}>
          <div className={st.onechat_block_img}>
            {oneChat.oneChat.users[0] && (
              <img src={`${oneChat.oneChat.users[0].avatarPath}`} />
            )}
          </div>
          <div className={st.onechat_block_name}>
            {oneChat.oneChat.users?.map((one, i) => (
              <div className={st.onechat_block_name_block} key={one.id}>
                {oneChat.oneChat.users.length == 1
                  ? one.name + " " + one.lastName
                  : oneChat.oneChat.users.length - 1 !== i
                  ? one.name + ",  "
                  : one.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};

export default OneChat;
