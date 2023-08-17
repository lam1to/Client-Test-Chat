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
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import { useFuncInput } from "../../../../Hooks/useFuncInput";
import testOne from "./testOne";
import { useTranslation } from "react-i18next";

export interface ISelectFileProps {
  selectFile: ISelectFile[];
  setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>;
}

const SelectFile: FC<ISelectFileProps> = ({ selectFile, setSelectFile }) => {
  const [items, setItems] = React.useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
  ]);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setSelectFile((selectFile) =>
      funcInput.arrayMove<ISelectFile>(selectFile, oldIndex, newIndex)
    );
  };
  const funcInput = useFuncInput();
  const [t] = useTranslation();
  return (
    <SortableList
      className={st.main_chat_input_upload_block}
      onSortEnd={onSortEnd}
    >
      <AnimatePresence>
        {selectFile &&
          selectFile.map((oneSelectFile, i) => (
            <SortableItem key={i}>
              <motion.div
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                exit={{ x: 1000 }}
                transition={{ duration: 0.5 }}
                className={st.main_chat_input_upload_block_container_one}
              >
                <div
                  className={st.main_chat_input_upload_block_container_one_drag}
                  style={{ cursor: "pointer" }}
                >
                  {t("mainChatInput.dragMe")}
                </div>
                <OneImgInput
                  oneFile={oneSelectFile}
                  selectFile={selectFile}
                  setSelectFile={setSelectFile}
                  key={oneSelectFile.id}
                />
              </motion.div>
            </SortableItem>
          ))}
      </AnimatePresence>
    </SortableList>
  );
};

export default SelectFile;
