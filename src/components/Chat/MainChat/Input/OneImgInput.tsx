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
const OneImgInput = React.forwardRef<HTMLDivElement, IOneImgInputProps>(
  ({ oneFile, selectFile, setSelectFile }, ref) => {
    const funcInput = useFuncInput();

    return (
      <div className={st.main_chat_input_upload_block_main_one}>
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
      </div>
    );
  }
);

export default OneImgInput;
