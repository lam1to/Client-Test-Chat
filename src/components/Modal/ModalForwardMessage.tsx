import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import st from "../../styles/modal.module.css";
import close from "../../public/close.png";
import { IChatWithUser } from "../../types/IChat";
import { useTranslation } from "react-i18next";
import OneChat from "../Chat/OneChat";
import OneChatForForward from "../Chat/OneChatForForward";
import { IUseSocket } from "../Chat/Chat";
import { useFuncChat } from "../../Hooks/useFuncChat";
import { IMessage } from "../../types/IMessage";
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  chats: IChatWithUser[];
  setSelectChat: Dispatch<SetStateAction<IChatWithUser>>;
  leftChat: IUseSocket<string>;
  selectForwardMessage: IMessage[];
  setCopySelectForwardMessage: Dispatch<SetStateAction<IMessage[]>>;
  blocked: IUseSocket<string>;
  blocker: IUseSocket<string>;
}

export const ModalForwardMessage: FC<ModalProps> = ({
  visible = false,
  onClose,
  chats,
  setSelectChat,
  leftChat,
  selectForwardMessage,
  setCopySelectForwardMessage,
  blocked,
  blocker,
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
  const [t] = useTranslation();
  const funcChat = useFuncChat();
  const [isHover, setIsHover] = useState<boolean>(false);
  // если компонент невидим, то не отображаем его

  if (!visible) return null;

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
          <h3 className={st.modal_title}>
            {t("mainChatForward.forwardInChat")}
          </h3>
          <span className={st.modal_close} onClick={onClose}>
            <img src={close} alt="" />
          </span>
        </div>
        <div className={st.modal_body}>
          {chats.map((oneChat) => {
            if (
              !funcChat.isLeft(leftChat, oneChat) &&
              funcChat.isBlockedOrBlockerF(oneChat, blocked, blocker) === "ok"
            )
              return (
                <OneChatForForward
                  onClose={onClose}
                  selectForwardMessage={selectForwardMessage}
                  setCopySelectForwardMessage={setCopySelectForwardMessage}
                  oneChat={oneChat}
                  setSelectChats={setSelectChat}
                  key={oneChat.id}
                />
              );
          })}
        </div>
      </div>
    </div>
  );
};
