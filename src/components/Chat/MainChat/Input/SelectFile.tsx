import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import st from "../../../../styles/mainChat.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { ISelectFile } from "./Input";
import { IContentImg } from "../../../../types/IMessage";
import OneImgInput from "./OneImgInput";

export interface ISelectFileProps {
  selectFile: ISelectFile[];
  setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>;
}

const SelectFile: FC<ISelectFileProps> = ({ selectFile, setSelectFile }) => {
  return (
    <div className={st.main_chat_input_upload_block}>
      <AnimatePresence>
        {selectFile &&
          selectFile.map((oneSelectFile) => (
            <OneImgInput
              oneFile={oneSelectFile}
              selectFile={selectFile}
              setSelectFile={setSelectFile}
              key={oneSelectFile.id}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default SelectFile;
