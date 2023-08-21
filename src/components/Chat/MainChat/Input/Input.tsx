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
import {
  IEditMessageWithImg,
  IMessage,
  IMessageLoadingImgs,
} from "../../../../types/IMessage";

import InputBlackList from "./InputBlackList";
import InputLeft from "./InputLeft";
import { useTranslation } from "react-i18next";
import { useFuncMessage } from "../../../../Hooks/useFuncMessage";
import clipPng from "../../../../public/paper-clip.png";
import SelectFile from "./SelectFile";
import SelectFileEdit from "./SelectFileEdit";
import InputReply from "./InputReply";
import InputEdit from "./InputEdit";
import InputEmoji from "./InputEmoji";
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
  isLoadingImgs: IMessageLoadingImgs[];
  setIsLoadingImgs: Dispatch<SetStateAction<IMessageLoadingImgs[]>>;
  replyMessage: IMessage;
  setReplyMessage: Dispatch<SetStateAction<IMessage>>;
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
  setIsLoadingImgs,
  replyMessage,
  setReplyMessage,
  isLoadingImgs,
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
    if (Object.keys(selectFile).length !== 0) {
      setCopySelectFile(selectFile);
      setIsLoadingImgs([
        ...selectFile.map((oneSelectFile, i) => {
          return { id: i, isLoading: true };
        }),
      ]);
    }
    funcMessage.createMessageF(
      socket,
      contentRef,
      selectFile,
      setSelectFile,
      chatId,
      setIsLoadingMessage,
      setIsLoadingImgs
    );
  };
  const [copyContentImg, setCopyContentImg] = useState<IEditMessageWithImg[]>(
    {} as IEditMessageWithImg[]
  );
  // console.log("edit message = ", editMessage);

  return (
    <div className={st.main_chat_input}>
      {Object.keys(editMessage).length !== 0 && (
        <InputEdit
          editMessage={editMessage}
          setEditMessage={setEditMessage}
          setCopyContentImg={setCopyContentImg}
          selectFile={selectFile}
          setSelectFile={setSelectFile}
          contentRef={contentRef}
          copyContentImg={copyContentImg}
        />
      )}
      {Object.keys(replyMessage).length !== 0 && (
        <InputReply
          setSelectFile={setSelectFile}
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
          contentRef={contentRef}
        />
      )}
      {/* <InputEmoji contentRef={contentRef} /> */}

      {Object.keys(selectFile).length !== 0 &&
        Object.keys(editMessage).length === 0 && (
          <SelectFile selectFile={selectFile} setSelectFile={setSelectFile} />
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
                Object.keys(editMessage).length !== 0 &&
                editMessage.contentImg &&
                editMessage.contentImg.length > 0
                  ? funcMessage.editMessageWithImg(
                      copyContentImg,
                      socket,
                      contentRef,
                      chatId,
                      editMessage,
                      setEditMessage
                    )
                  : Object.keys(editMessage).length !== 0
                  ? funcMessage.editMessageF(
                      socket,
                      contentRef,
                      chatId,
                      editMessage,
                      setEditMessage
                    )
                  : Object.keys(replyMessage).length !== 0
                  ? funcMessage.replyMessageF(
                      selectFile,
                      setSelectFile,
                      socket,
                      contentRef,
                      chatId,
                      replyMessage,
                      setReplyMessage,
                      setIsLoadingImgs
                    )
                  : createMessage();
              }
            }}
          />

          <button
            onClick={() => {
              Object.keys(editMessage).length !== 0 &&
              editMessage.contentImg &&
              editMessage.contentImg.length > 0
                ? funcMessage.editMessageWithImg(
                    copyContentImg,
                    socket,
                    contentRef,
                    chatId,
                    editMessage,
                    setEditMessage
                  )
                : Object.keys(editMessage).length !== 0
                ? funcMessage.editMessageF(
                    socket,
                    contentRef,
                    chatId,
                    editMessage,
                    setEditMessage
                  )
                : Object.keys(replyMessage).length !== 0
                ? funcMessage.replyMessageF(
                    selectFile,
                    setSelectFile,
                    socket,
                    contentRef,
                    chatId,
                    replyMessage,
                    setReplyMessage,
                    setIsLoadingImgs
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
