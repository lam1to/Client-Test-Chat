import React, { FC } from "react";
import st from "../../../../styles/message.module.css";
import { ISelectFile } from "../Input/Input";

export interface IPropsOneMessageWithImgLoading {
  selectFile: ISelectFile[];
  content: string;
}

const OneMessageWithImgLoading: FC<IPropsOneMessageWithImgLoading> = ({
  selectFile,
  content,
}) => {
  const funcReader = (selectFile: File) => {
    if (selectFile) return URL.createObjectURL(selectFile);
  };
  console.log("loading selectFile = ", selectFile);
  return (
    <div>
      <div className={st.message_block_self}>
        <div className={`${st.message_container} ${st.message_container_self}`}>
          <div className={st.message_content_self}>
            <div className={st.message_with_img_container}>
              {selectFile.map((oneImg, i) => (
                <div
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    width:
                      selectFile.length === 1
                        ? "50%"
                        : selectFile.length <= 4
                        ? "33%"
                        : "25%",
                  }}
                  className={st.message_with_img_block}
                >
                  <img
                    loading="lazy"
                    key={i}
                    src={funcReader(oneImg.file)}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div>{content}</div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default OneMessageWithImgLoading;
