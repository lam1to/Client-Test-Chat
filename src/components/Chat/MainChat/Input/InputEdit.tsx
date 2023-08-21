import React, { Dispatch, FC, SetStateAction } from "react";
import st from "../../../../styles/mainChat.module.css";
import pencilImg from "../../../../public/pencil.png";
import { IEditMessageWithImg, IMessage } from "../../../../types/IMessage";
import SelectFileEdit from "./SelectFileEdit";
import { ISelectFile } from "./Input";
import { useTranslation } from "react-i18next";

export interface IInputEditProps {
  editMessage: IMessage;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  selectFile: ISelectFile[];
  setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>;
  copyContentImg: IEditMessageWithImg[];
  setCopyContentImg: Dispatch<SetStateAction<IEditMessageWithImg[]>>;
}

const InputEdit: FC<IInputEditProps> = ({
  editMessage,
  setEditMessage,
  contentRef,
  selectFile,
  setSelectFile,
  copyContentImg,
  setCopyContentImg,
}) => {
  const [t] = useTranslation();
  return (
    <div
      className={`${
        editMessage.contentImg &&
        Object.keys(editMessage.contentImg).length !== 0
          ? st.main_chat_input_edit_block_with_img
          : st.main_chat_input_edit_block_without_img
      } ${st.main_chat_input_edit_block}`}
    >
      <div className={st.main_chat_input_edit_block_message_content}>
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
          {t("mainChatInput.close")}
        </div>
      </div>

      <div className={st.main_chat_input_edit_row_img}>
        {editMessage.contentImg &&
          Object.keys(editMessage.contentImg).length !== 0 && (
            <SelectFileEdit
              selectFile={selectFile}
              setSelectFile={setSelectFile}
              editMessage={editMessage}
              setCopyContentImg={setCopyContentImg}
              copyContentImg={copyContentImg}
            />
          )}
      </div>
    </div>
  );
};

export default InputEdit;
