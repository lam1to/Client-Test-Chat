import {
  Dispatch,
  FC,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import st from "../../styles/modal.module.css";
import { IContentImg } from "../../types/IMessage";
import { motion } from "framer-motion";
import arrow from "../../public/arrow.png";
import close from "../../public/close.png";
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  contentImg: IContentImg[];
  selectImg: number;
  setSelectImg: Dispatch<SetStateAction<number>>;
}

export const ModalPhoto: FC<ModalProps> = ({
  visible = false,
  onClose,
  contentImg,
  selectImg,
  setSelectImg,
}) => {
  // создаем обработчик нажатия клавиши Esc
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  // c помощью useEffect цепляем обработчик к нажатию клавиш
  // https://ru.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });
  const [isHover, setIsHover] = useState<boolean>(false);
  // если компонент невидим, то не отображаем его
  if (!visible) return null;

  const leftImg = () => {
    selectImg !== 0
      ? setSelectImg(selectImg - 1)
      : setSelectImg(contentImg.length - 1);
  };
  const rightImg = () => {
    selectImg !== contentImg.length - 1
      ? setSelectImg(selectImg + 1)
      : setSelectImg(0);
  };
  const setWidth = () => {
    const img = new Image();
    img.src = contentImg.filter((oneImg, i) => i === selectImg)[0].image_url;
    if (img.width < 350) {
      return "auto";
    } else {
      return "100%";
    }
  };
  // или возвращаем верстку модального окна
  return (
    <div
      className={st.modal}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className={st.modal_dialog} onClick={(e) => e.stopPropagation()}>
        <div className={st.modal_header}>
          {contentImg.length > 1 && (
            <div className={st.modal_header_photo_count}>
              {selectImg + 1 + "/" + contentImg.length}
            </div>
          )}

          <span className={st.modal_close} onClick={onClose}>
            <img src={close} alt="" />
          </span>
        </div>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={st.modal_body_photo}
        >
          {contentImg.length > 1 && isHover && (
            <motion.img
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 180 }}
              exit={{ opacity: 0, rotate: 0 }}
              transition={{ duration: 1 }}
              className={`${st.modal_body_photo_click} ${st.modal_body_photo_click_left}`}
              onClick={leftImg}
              src={arrow}
              alt=""
            />
          )}

          {contentImg.map((oneImg, i) => {
            return (
              <div
                key={i}
                className={
                  selectImg === i
                    ? st.modal_body_photo_item_activ
                    : st.modal_body_photo_item
                }
              >
                <img
                  style={{ width: `${selectImg === i ? setWidth() : 0}` }}
                  src={oneImg.image_url}
                  alt=""
                />
              </div>
            );
          })}
          {contentImg.length > 1 && isHover && (
            <motion.img
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={`${st.modal_body_photo_click} ${st.modal_body_photo_click_right}`}
              onClick={rightImg}
              src={arrow}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};
