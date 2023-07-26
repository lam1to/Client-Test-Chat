import React, { FC } from "react";
import st from "../../../styles/mainChat.module.css";
import exclamationImg from "../../../public/exclamation.png";
import { useTranslation } from "react-i18next";
export interface PropsMainChatInputBlackList {
  blackList: string;
}

const InputBlackList: FC<PropsMainChatInputBlackList> = ({ blackList }) => {
  const [t, i18n] = useTranslation();
  return (
    <div className={st.blackList_main_block}>
      <div className={st.blackList_img}>
        <img src={exclamationImg} alt="" />
      </div>
      {blackList === "blockedBlocker" ? (
        <div className={st.main_chat_input_blackList_block}>
          <div className={st.main_chat_input_blackList_item}>
            {t("mainChatInputBlack.blockedUser")}
          </div>
          <div className={st.main_chat_input_blackList_item}>
            {t("mainChatInputBlack.blockerUser")}
          </div>
        </div>
      ) : blackList === "blocked" ? (
        <div className={st.main_chat_input_blackList_item}>
          {t("mainChatInputBlack.blockedUser")}
        </div>
      ) : (
        <div className={st.main_chat_input_blackList_item}>
          {t("mainChatInputBlack.blockerUser")}
        </div>
      )}
      ;
    </div>
  );
};

export default InputBlackList;
