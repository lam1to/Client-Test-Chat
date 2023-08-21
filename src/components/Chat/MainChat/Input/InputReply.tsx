import React, { Dispatch, FC, SetStateAction } from "react";
import st from "../../../../styles/mainChat.module.css";
import { IMessage } from "../../../../types/IMessage";
import { useTranslation } from "react-i18next";
import replyImg from "../../../../public/reply.png";
import { ISelectFile } from "./Input";

export interface IInputReplyProps {
  replyMessage: IMessage;
  setReplyMessage: Dispatch<SetStateAction<IMessage>>;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>;
}

const InputReply: FC<IInputReplyProps> = ({
  replyMessage,
  setReplyMessage,
  contentRef,
  setSelectFile,
}) => {
  const [t] = useTranslation();
  return (
    <div className={` ${st.main_chat_input_reply_block}`}>
      <div className={st.main_chat_input_reply_block_message_content}>
        <div className={st.main_chat_input_reply_container}>
          <div className={st.main_chat_input_reply_img}>
            <img src={replyImg} alt="" />
          </div>
          <div className={st.main_chat_input_reply_title_block}>
            <div className={st.main_chat_input_reply_title}>
              {replyMessage.content.length > 20 ? (
                <div>
                  {t("mainChatInput.replyMessage") +
                    replyMessage.content.slice(0, 20)}
                </div>
              ) : (
                <div>
                  {t("mainChatInput.replyMessage") + replyMessage.content}
                </div>
              )}
            </div>
            <div className={st.main_chat_input_reply_attachments}>
              {replyMessage.contentImg &&
                Object.keys(replyMessage.contentImg).length !== 0 && (
                  <div>
                    {t("mainChatInput.attachments") +
                      replyMessage.contentImg.length}
                  </div>
                )}
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setReplyMessage({} as IMessage);
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

export default InputReply;
