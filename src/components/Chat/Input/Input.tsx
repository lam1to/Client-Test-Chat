import React, { FC, useEffect, useRef, Dispatch, SetStateAction } from "react";
import st from "../../../styles/mainChat.module.css";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../../Hooks/redux";
import { IMessage } from "../../../types/IMessage";
import pencilImg from "../../../public/pencil.png";
import InputBlackList from "./InputBlackList";
import { selectUser } from "../../../store/Reducers/UserSlice";
import InputLeft from "./InputLeft";
import { useTranslation } from "react-i18next";
import { useFuncMessage } from "../../../Hooks/useFuncMessage";
// import InputEmoji from "./InputEmoji";
export interface PropsMainChatInput {
  socket: Socket;
  chatId: string;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  editMessage: IMessage;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  blackList: string;
  isLeft: boolean;
}

const Input: FC<PropsMainChatInput> = ({
  socket,
  chatId,
  contentRef,
  editMessage,
  setEditMessage,
  blackList,
  isLeft,
}) => {
  useEffect(() => {}, []);
  const [t, i18n] = useTranslation();
  const funcMessage = useFuncMessage();
  return (
    <div className={st.main_chat_input}>
      {Object.keys(editMessage).length !== 0 && (
        <div className={st.main_chat_input_edit_block}>
          <div className={st.main_chat_input_edit_container}>
            <div className={st.main_chat_input_edit_img}>
              <img src={pencilImg} alt="" />
            </div>
            <div className={st.main_chat_input_edit_title}>
              {t("mainChatInput.editMessage") + editMessage.content}
            </div>
          </div>
          <div
            onClick={() => {
              setEditMessage({} as IMessage);
              contentRef.current.value = "";
            }}
            className={st.main_chat_input_edit_close}
          >
            {t("mainChatInput.closeEdit")}
          </div>
        </div>
      )}
      {/* <InputEmoji contentRef={contentRef} /> */}
      {blackList !== "ok" ? (
        <InputBlackList blackList={blackList} />
      ) : isLeft ? (
        <InputLeft />
      ) : (
        <div className={st.main_chat_form}>
          <input
            placeholder={t("mainChatInput.InputMessage")}
            type="text"
            className={st.main_chat_form_input}
            ref={contentRef}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                Object.keys(editMessage).length !== 0
                  ? funcMessage.editMessageF(
                      socket,
                      contentRef,
                      chatId,
                      editMessage,
                      setEditMessage
                    )
                  : funcMessage.createMessageF(socket, contentRef, chatId);
              }
            }}
          />

          <button
            onClick={() => {
              Object.keys(editMessage).length !== 0
                ? funcMessage.editMessageF(
                    socket,
                    contentRef,
                    chatId,
                    editMessage,
                    setEditMessage
                  )
                : funcMessage.createMessageF(socket, contentRef, chatId);
            }}
            type="button"
            className={st.main_chat_form_button}
          >
            {t("mainChatInput.send")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
