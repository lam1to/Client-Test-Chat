import { motion } from "framer-motion";
import React, { FC } from "react";
import st from "../../../../styles/mainChat.module.css";
import { useFuncInput } from "../../../../Hooks/useFuncInput";
import { ISelectFile } from "./Input";
import Loader from "../../../Loading/Loader";
import Uploaded from "../Message/Uploaded";

export interface IOneImgLoadingInputProps {
  isLoading: boolean;
  oneFile: ISelectFile;
}

const OneImgLoadingInput: FC<IOneImgLoadingInputProps> = ({
  isLoading,
  oneFile,
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
      <div className={st.loading_container}>
        {isLoading === true ? <Loader width={20} height={20} /> : <Uploaded />}
      </div>
    </motion.div>
  );
};

export default OneImgLoadingInput;
