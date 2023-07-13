import React, { FC } from "react";
import st from "../../styles/mainChat.module.css";
import exclamationImg from "../../public/exclamation.png";
export interface PropsMainChatInputBlackList {
  blackList: string;
}

const MainChatInputBlackList: FC<PropsMainChatInputBlackList> = ({
  blackList,
}) => {
  return (
    <div className={st.blackList_main_block}>
      <div className={st.blackList_img}>
        <img src={exclamationImg} alt="" />
      </div>
      {blackList === "blockedBlocker" ? (
        <div className={st.main_chat_input_blackList_block}>
          <div className={st.main_chat_input_blackList_item}>
            Вы заблокировали пользователя. Чтобы написать ему сообщение,
            необходимо его разблокировать.
          </div>
          <div className={st.main_chat_input_blackList_item}>
            Данный пользователь вас заблокировал
          </div>
        </div>
      ) : blackList === "blocked" ? (
        <div className={st.main_chat_input_blackList_item}>
          Вы заблокировали пользователя. Чтобы написать ему сообщение,
          необходимо его разблокировать.
        </div>
      ) : (
        <div className={st.main_chat_input_blackList_item}>
          Данный пользователь вас заблокировал
        </div>
      )}
      ;
    </div>
  );
};

export default MainChatInputBlackList;
