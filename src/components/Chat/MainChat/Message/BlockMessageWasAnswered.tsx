import React, { FC } from "react";
import { IMessage } from "../../../../types/IMessage";
import st from "../../../../styles/message.module.css";

import replyImg from "../../../../public/reply.png";
import { useTranslation } from "react-i18next";
export interface IBlockMessageWasAnswered {
  message: IMessage;
}

const BlockMessageWasAnswered: FC<IBlockMessageWasAnswered> = ({ message }) => {
  const [t] = useTranslation();
  return (
    <div className={st.reply_container}>
      <div className={st.reply_img}>
        <img src={replyImg} alt="" />
      </div>
      <div className={st.reply_content_block}>
        {message.contentImg && Object(message.contentImg).length !== 0 && (
          <div className={st.reply_content_img_block}>
            <img src={message.contentImg[0].image_url} />
          </div>
        )}
        <div className={st.reply_content}>
          <div className={st.reply_content_text}>
            {message.content.length > 20
              ? message.content.slice(0, 20)
              : message.content}
          </div>
          {message.contentImg && Object(message.contentImg).length !== 0 && (
            <div className={st.reply_content_count_img}>
              {message.contentImg?.length + t("mainChatInput.replyPhotos")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockMessageWasAnswered;
