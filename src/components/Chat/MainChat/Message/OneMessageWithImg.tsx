import React, { FC, useEffect, useState } from "react";
import { IContentImg } from "../../../../types/IMessage";
import st from "../../../../styles/message.module.css";
import { ModalPhoto } from "../../../Modal/ModalPhoto";

export interface IOneMessageWithImg {
  contentImg: IContentImg[];
}

const OneMessageWithImg: FC<IOneMessageWithImg> = ({ contentImg }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectImg, setSelectImg] = useState<number>({} as number);
  const calcNewWidh = (width: number) => {
    while (width > 450) width = width / 2;
    return width;
  };
  const calcWith = (oneImg: IContentImg) => {
    const img = new Image();
    img.src = oneImg.image_url;
    const newWidh =
      img.width < 400
        ? img.width
        : img.width < 1000
        ? img.width / 4
        : calcNewWidh(img.width);
    return newWidh;
  };
  return (
    <div className={st.message_with_img_container}>
      {contentImg.map((oneImg, i) => (
        <div
          key={i}
          onClick={(e) => {
            setSelectImg(i);
            setVisible(true);
            e.stopPropagation();
          }}
          style={{
            width:
              contentImg.length === 1
                ? "30%"
                : contentImg.length <= 4
                ? "40%"
                : "25%",
          }}
          className={st.message_with_img_block}
        >
          <img key={i} src={oneImg.image_url} alt="" />
        </div>
      ))}
      {visible && (
        <ModalPhoto
          selectImg={selectImg}
          setSelectImg={setSelectImg}
          contentImg={contentImg}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}
    </div>
  );
};

export default OneMessageWithImg;
