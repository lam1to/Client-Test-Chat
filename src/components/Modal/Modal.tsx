import { FC, ReactElement, ReactNode, useEffect } from "react";
import st from "../../styles/modal.module.css";
interface ModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  visible = false,
  title = "",
  onClose,
  children,
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

  // если компонент невидим, то не отображаем его
  if (!visible) return null;

  // или возвращаем верстку модального окна
  return (
    <div className={st.modal} onClick={onClose}>
      <div className={st.modal_dialog} onClick={(e) => e.stopPropagation()}>
        <div className={st.modal_header}>
          <h3 className={st.modal_title}>{title}</h3>
          <span className={st.modal_close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={st.modal_body}>
          <div className={st.modal_content}>{children}</div>
        </div>
      </div>
    </div>
  );
};
