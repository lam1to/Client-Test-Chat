import { motion } from "framer-motion";
import React, { Dispatch, FC, SetStateAction } from "react";
import { ISelectFile } from "./Input";
import st from "../../../../styles/mainChat.module.css";
import { useFuncInput } from "../../../../Hooks/useFuncInput";

export interface IOneImgInputProps {
  oneFile: ISelectFile;
  selectFile: ISelectFile[];
  setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>;
}
const OneImgInput: FC<IOneImgInputProps> = ({
  oneFile,
  selectFile,
  setSelectFile,
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
        src={funcInput.funcReader(oneFile.file)}
      />

      <div
        className={st.main_chat_input_upload_block_close}
        onClick={() => funcInput.closeImg(oneFile, setSelectFile, selectFile)}
      >
        close
      </div>
    </motion.div>
  );
};

export default OneImgInput;
