import React, {
  FC,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import st from "../../../../styles/mainChat.module.css";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../../../Hooks/redux";
import { IMessage } from "../../../../types/IMessage";
import pencilImg from "../../../../public/pencil.png";
import InputBlackList from "./InputBlackList";
import { selectUser } from "../../../../store/Reducers/UserSlice";
import InputLeft from "./InputLeft";
import { useTranslation } from "react-i18next";
import { useFuncMessage } from "../../../../Hooks/useFuncMessage";
import clipPng from "../../../../public/paper-clip.png";
import closePng from "../../../../public/close.png";
import { AnimatePresence, motion } from "framer-motion";
// import InputEmoji from "./InputEmoji";
export interface PropsMainChatInput {
  setCopySelectFile: Dispatch<SetStateAction<ISelectFile[]>>;
  socket: Socket;
  chatId: string;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  editMessage: IMessage;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  blackList: string;
  isLeft: boolean;
  setIsLoadingMessage: Dispatch<SetStateAction<boolean>>;
}
export interface ISelectFile {
  id: number;
  file: File;
}

const Input: FC<PropsMainChatInput> = ({
  setCopySelectFile,
  socket,
  chatId,
  contentRef,
  editMessage,
  setEditMessage,
  blackList,
  isLeft,
  setIsLoadingMessage,
}) => {
  useEffect(() => {}, []);
  const [t, i18n] = useTranslation();
  const funcMessage = useFuncMessage();
  const refInput = useRef<HTMLInputElement>({} as HTMLInputElement);

  const startUpload = () => {
    refInput.current.click();
  };
  const [selectFile, setSelectFile] = useState<ISelectFile[]>(
    [] as ISelectFile[]
  );
  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        setSelectFile((selectFile) => {
          if (e.target.files)
            return [
              ...selectFile,
              { id: selectFile.length, file: e.target.files[i] },
            ];
          else {
            return selectFile;
          }
        });
      }
    }
  };
  const funcReader = (selectFile: File) => {
    if (selectFile) return URL.createObjectURL(selectFile);
  };
  const closeImg = (oneSelectFile: ISelectFile) => {
    setSelectFile(
      selectFile.filter((oneFile) => oneFile.id !== oneSelectFile.id)
    );
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
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      setSelectFile((selectFile) => {
        return [
          ...selectFile,
          { id: selectFile.length, file: e.dataTransfer.files[i] },
        ];
      });
    }
    setDrag(false);
  };
  const createMessage = () => {
    console.log("зашли в создарние и у нас такие картинки = ", selectFile);
    if (Object.keys(selectFile).length !== 0) {
      console.log("зашли в копирование");
      setCopySelectFile(selectFile);
    }
    funcMessage.createMessageF(
      socket,
      contentRef,
      selectFile,
      setSelectFile,
      chatId,
      setIsLoadingMessage
    );
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

      {Object.keys(selectFile).length !== 0 && (
        <div className={st.main_chat_input_upload_block}>
          <AnimatePresence>
            {selectFile.map((oneSelectFile) => (
              <motion.div
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                exit={{ x: 1000 }}
                transition={{ duration: 0.5 }}
                key={oneSelectFile.id}
                className={st.main_chat_input_upload_block_main_one}
              >
                <img
                  className={st.main_chat_input_upload_block_main_img}
                  src={funcReader(oneSelectFile.file)}
                />

                <div
                  className={st.main_chat_input_upload_block_close}
                  onClick={() => closeImg(oneSelectFile)}
                >
                  close
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {drag ? (
        <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={onDropHandler}
          className={st.drag_drop_container}
        >
          <div className={st.drag_drop_block}>
            {t("mainChatInput.dragAndDrop")}
          </div>
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
              multiple={true}
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
                  : createMessage();
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
                : createMessage();
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
