import React, { FC, useEffect } from "react";
import st from "../../../../styles/message.module.css";
import { ISelectFile } from "../Input/Input";
import { IMessageLoadingImgs } from "../../../../types/IMessage";
import Loader from "../../../Loading/Loader";
import Uploaded from "./Uploaded";

export interface IPropsOneMessageWithImgLoading {
  selectFile: ISelectFile[];
  content: string;
  isLoadingImgs: IMessageLoadingImgs[];
}

const OneMessageWithImgLoading: FC<IPropsOneMessageWithImgLoading> = ({
  selectFile,
  content,
  isLoadingImgs,
}) => {
  const funcReader = (selectFile: File) => {
    if (selectFile) return URL.createObjectURL(selectFile);
  };
  useEffect(() => {
    console.log("загрузка", isLoadingImgs);
  }, [isLoadingImgs]);
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
                  <div className={st.loading_container}>
                    {isLoadingImgs.filter((oneLoad) => oneLoad.id === i)[0]
                      .isLoading === true ? (
                      <Loader width={20} height={20} />
                    ) : (
                      <Uploaded />
                    )}
                  </div>
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
