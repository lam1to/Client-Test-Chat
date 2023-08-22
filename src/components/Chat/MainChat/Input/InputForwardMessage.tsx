import React, { Dispatch, FC, SetStateAction } from "react";
import { IMessage } from "../../../../types/IMessage";
import st from "../../../../styles/mainChat.module.css";
import forwardArrowImg from "../../../../public/arrowForward.png";
import { ISelectFile } from "./Input";
import { useTranslation } from "react-i18next";

export interface IInputForwardMessageProps {
  setCopySelectForwardMessage: Dispatch<SetStateAction<IMessage[]>>;
  copySelectForwardMessage: IMessage[];
  contentRef: React.MutableRefObject<HTMLInputElement>;
  setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>;
}

const InputForwardMessage: FC<IInputForwardMessageProps> = ({
  setCopySelectForwardMessage,
  copySelectForwardMessage,
  contentRef,
  setSelectFile,
}) => {
  const [t] = useTranslation();
  return (
    <div className={` ${st.main_chat_input_reply_block}`}>
      <div className={st.main_chat_input_reply_block_message_content}>
        <div className={st.main_chat_input_reply_container}>
          <div className={st.main_chat_input_reply_img}>
            <img src={forwardArrowImg} alt="" />
          </div>
          <div className={st.main_chat_input_reply_title_block}>
            <div className={st.main_chat_input_reply_title}>
              {t("mainChatInput.ForwardMessage")}
            </div>
            <div className={st.main_chat_input_reply_attachments}>
              {copySelectForwardMessage.length + t("mainChatInput.message")}
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setCopySelectForwardMessage([] as IMessage[]);
            contentRef.current.value = "";
            setSelectFile([] as ISelectFile[]);
          }}
          className={st.main_chat_input_reply_close}
        >
          {t("mainChatInput.close")}
        </div>
      </div>
    </div>
  );
};

export default InputForwardMessage;
