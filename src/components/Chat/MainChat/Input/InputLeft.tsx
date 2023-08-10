import React, { FC } from "react";
import st from "../../../../styles/mainChat.module.css";
import { useTranslation } from "react-i18next";
const InputLeft: FC = () => {
  const [t, i18n] = useTranslation();
  return (
    <div className={st.main_chat_input_left}>
      {t("mainChatInputLeftChat.weLeft")}
    </div>
  );
};

export default InputLeft;
