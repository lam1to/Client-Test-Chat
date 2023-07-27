import React, {
  FC,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
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
import clipPng from "../../../public/paper-clip.png";
import closePng from "../../../public/close.png";
import { AnimatePresence, motion } from "framer-motion";
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
  const refInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [selectFile, setSelectFile] = useState<File>({} as File);
  const startUpload = () => {
    refInput.current.click();
  };
  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      setSelectFile(e.target.files[0]);
    }
  };
  const funcReader = () => {
    if (selectFile) return URL.createObjectURL(selectFile);
  };
  const closeImg = () => {
    setSelectFile({} as File);
  };
  const [drag, setDrag] = useState<boolean>(false);
  const dragStartHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setSelectFile(e.dataTransfer.files[0]);
    setDrag(false);
  };
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
      <AnimatePresence>
        {selectFile && selectFile.name && (
          <motion.div
            initial={{ height: 0, width: 0 }}
            animate={{ height: 100, width: 100 }}
            exit={{ height: 0, width: 0 }}
            className={st.main_chat_input_upload_block}
          >
            <img
              className={st.main_chat_input_upload_block_main_img}
              src={funcReader()}
            />

            <div
              className={st.main_chat_input_upload_block_close}
              onClick={closeImg}
            >
              close
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {drag ? (
        <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={onDropHandler}
          className={st.drag_drop_container}
        >
          <div className={st.drag_drop_block}>Перетащите сюда фото</div>
        </div>
      ) : blackList !== "ok" ? (
        <InputBlackList blackList={blackList} />
      ) : isLeft ? (
        <InputLeft />
      ) : (
        <div className={st.main_chat_form}>
          <div className={st.main_chat_form_upload}>
            <input
              ref={refInput}
              className={st.main_chat_form_upload_input}
              type="file"
              onChange={onChangeInputFile}
              accept="image/*"
            />
            <img onClick={startUpload} src={clipPng} alt="" />
          </div>
          <input
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
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
