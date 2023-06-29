import React, { FC } from "react";
import { IAllChatWithUser } from "../../types/IChat";
import st from "../../styles/oneChat.module.css";

const OneChat: FC<IAllChatWithUser> = (oneChat) => {
  return (
    <button className={st.onechat_container}>
      <div className={st.onechat}>
        <div className={st.onechat_block}>
          <div className={st.onechat_block_img}>
            <img src={oneChat.users[0].avatarPath} alt="" />
          </div>
          <div className={st.onechat_block_name}>
            {oneChat.users?.map((one, i) => (
              <div className={st.onechat_block_name_block} key={i}>
                {oneChat.users.length == 1
                  ? one.name + " " + one.lastName
                  : oneChat.users.length - 1 !== i
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
