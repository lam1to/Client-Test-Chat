import { motion } from "framer-motion";
import React, { Dispatch, FC, SetStateAction } from "react";
import { ISelectFile } from "./Input";
import st from "../../../../styles/mainChat.module.css";
import { useFuncInput } from "../../../../Hooks/useFuncInput";
import { IEditMessageWithImg, IMessage } from "../../../../types/IMessage";
import { removeFile } from "../../../../http/message.service";

export interface IOneImgInputProps {
  contentUrl: string;
  copyContentImg: IEditMessageWithImg[];
  setCopyContentImg: Dispatch<SetStateAction<IEditMessageWithImg[]>>;
  editMessage: IMessage;
}
const OneImgEditMessageInput: FC<IOneImgInputProps> = ({
  contentUrl,
  setCopyContentImg,
  copyContentImg,
  editMessage,
}) => {
  const funcInput = useFuncInput();
  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit={{ x: 1000 }}
      transition={{ duration: 0.5 }}
      className={st.main_chat_input_upload_block_main_one}
    >
      <img
        className={st.main_chat_input_upload_block_main_img}
        src={contentUrl}
      />

      <div
        className={st.main_chat_input_upload_block_close}
        onClick={() =>
          funcInput.closeEditOneContentImg(
            editMessage,
            copyContentImg,
            setCopyContentImg,
            contentUrl
          )
        }
      >
        close
      </div>
    </motion.div>
  );
};

export default OneImgEditMessageInput;
