import React, { Dispatch, FC, SetStateAction } from "react";
import st from "../../../../styles/mainChat.module.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { IMessage } from "../../../../types/IMessage";

export interface ISelectForwardBlock {
  setSelectForwardMessage: Dispatch<SetStateAction<IMessage[]>>;
  selectForwardMessage: IMessage[];
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const SelectForwardBlock: FC<ISelectForwardBlock> = ({
  selectForwardMessage,
  setSelectForwardMessage,
  setVisible,
}) => {
  const [t] = useTranslation();
  return (
    <div className={st.select_forward_container}>
      <div
        onClick={() => {
          console.log("нажали forward");
          setVisible(true);
        }}
        className={st.select_forward_block}
      >
        {t("mainChatForward.forward") + selectForwardMessage.length}
      </div>
      <div
        onClick={() => {
          setSelectForwardMessage([] as IMessage[]);
        }}
        className={st.select_forward_close}
      >
        {t("mainChatInput.close")}
      </div>
    </div>
  );
};

export default SelectForwardBlock;
