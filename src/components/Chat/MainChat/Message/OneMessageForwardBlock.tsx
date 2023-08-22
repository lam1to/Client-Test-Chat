import React, { FC } from "react";
import { ILastMessage, IMessage } from "../../../../types/IMessage";
import st from "../../../../styles/message.module.css";
import forwardArrowImg from "../../../../public/arrowForward.png";
export interface IOneMessageForwardBlockProps {
  forwardMessages: ILastMessage[];
}

const OneMessageForwardBlock: FC<IOneMessageForwardBlockProps> = ({
  forwardMessages,
}) => {
  return (
    <div className={st.forward_container}>
      <div className={st.forward_arrow}>
        <img src={forwardArrowImg} alt="" />
      </div>
      <div className={st.forward_row}>
        {forwardMessages.map((oneMessage, i) => (
          <div className={st.forward_row_item} key={i}>
            <div className={st.forward_row_item_name}>{oneMessage.name}</div>
            <div className={st.forward_row_item_content}>
              {oneMessage.contentImg &&
                Object.keys(oneMessage.contentImg).length !== 0 && (
                  <div className={st.forward_row_item_content_img}>
                    <img src={oneMessage.contentImg[0].image_url} alt="" />
                  </div>
                )}

              <div className={st.forward_row_item_content_text}>
                {oneMessage.content.length !== 15
                  ? oneMessage.content.slice(0.15)
                  : oneMessage.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OneMessageForwardBlock;
