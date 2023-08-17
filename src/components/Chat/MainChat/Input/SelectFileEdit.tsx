import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ISelectFile } from "./Input";
import {
  IEditMessageWithImg,
  IMessage,
  IMessageLoadingImgs,
} from "../../../../types/IMessage";
import { AnimatePresence, motion } from "framer-motion";
import st from "../../../../styles/mainChat.module.css";
import { useFuncInput } from "../../../../Hooks/useFuncInput";
import OneImgLoadingInput from "./OneImgLoadingInput";
import OneImgEditMessageInput from "./OneImgEditMessageInput";
import SortableList, { SortableItem } from "react-easy-sort";
import { useTranslation } from "react-i18next";

export interface ISelectFileEditProps {
  selectFile: ISelectFile[];
  setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>;
  editMessage: IMessage;
  setCopyContentImg: Dispatch<SetStateAction<IEditMessageWithImg[]>>;
  copyContentImg: IEditMessageWithImg[];
}

const SelectFileEdit: FC<ISelectFileEditProps> = ({
  selectFile,
  setSelectFile,
  editMessage,
  setCopyContentImg,
  copyContentImg,
}) => {
  const funcInput = useFuncInput();
  useEffect(() => {
    if (editMessage && editMessage.contentImg) {
      setCopyContentImg([
        ...editMessage.contentImg.map((oneContentImg) => {
          return { image_url: oneContentImg.image_url };
        }),
      ]);
    }
  }, []);
  const [isLoadingImgs, setIsLoadingImgs] = useState<IMessageLoadingImgs[]>(
    [] as IMessageLoadingImgs[]
  );

  useEffect(() => {
    if (
      Object.keys(selectFile).length !== 0 &&
      editMessage &&
      editMessage.contentImg
    ) {
      funcInput.uploadNewFile(
        selectFile,
        setSelectFile,
        setIsLoadingImgs,
        setCopyContentImg
      );
    }
  }, [selectFile.length]);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    console.log("last ", oldIndex);
    console.log("new", newIndex);
    setCopyContentImg((copyContentImg) =>
      funcInput.arrayMove<IEditMessageWithImg>(
        copyContentImg,
        oldIndex,
        newIndex
      )
    );
    console.log("copy -", copyContentImg);
  };
  const [t] = useTranslation();
  const masAll = [1, 2, 3, 4];
  const masNewPlace = [3, 1, 4, 2];
  console.log("mas all do", masAll);
  // for (let i = 0; i < masAll.length; i++) {
  //   if (masAll[i] !== masNewPlace[i]) {
  //     for (let j = i + 1; j < masAll.length; j++) {
  //       if (masAll[j] === masNewPlace[i]) {
  //         const oldValue = masAll[i];
  //         const newValue = masAll[j];
  //         masAll[i] = newValue;
  //         masAll[j] = oldValue;
  //       }
  //     }
  //   }
  // }
  const newMas = masAll.map((oneMasAll, i) => {
    oneMasAll = masNewPlace[i];
    return oneMasAll;
  });
  console.log(newMas);
  console.log("mas all posle", masAll);

  return (
    <SortableList
      className={st.main_chat_input_upload_block}
      onSortEnd={onSortEnd}
    >
      <AnimatePresence>
        {Object.keys(copyContentImg).length !== 0 &&
          copyContentImg &&
          copyContentImg.map((oneImg, i) => (
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
                <OneImgEditMessageInput
                  key={i}
                  copyContentImg={copyContentImg}
                  setCopyContentImg={setCopyContentImg}
                  contentUrl={oneImg.image_url}
                  editMessage={editMessage}
                />
              </motion.div>
            </SortableItem>
          ))}
      </AnimatePresence>
      {Object.keys(isLoadingImgs).length !== 0 &&
        isLoadingImgs[isLoadingImgs.length - 1].isLoading &&
        selectFile.map((oneSelectFile, i) => (
          <div key={i}>
            {isLoadingImgs[i].isLoading && (
              <OneImgLoadingInput
                oneFile={oneSelectFile}
                isLoading={isLoadingImgs[i].isLoading}
              />
            )}
          </div>
        ))}
    </SortableList>
  );
};

export default SelectFileEdit;
