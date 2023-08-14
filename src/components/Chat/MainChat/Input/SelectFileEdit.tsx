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
import { AnimatePresence } from "framer-motion";
import st from "../../../../styles/mainChat.module.css";
import { useFuncInput } from "../../../../Hooks/useFuncInput";
import OneImgLoadingInput from "./OneImgLoadingInput";
import OneImgEditMessageInput from "./OneImgEditMessageInput";

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
  return (
    <div className={st.main_chat_input_upload_block}>
      <AnimatePresence>
        {Object.keys(copyContentImg).length !== 0 &&
          copyContentImg &&
          copyContentImg.map((oneImg, i) => (
            <OneImgEditMessageInput
              key={i}
              copyContentImg={copyContentImg}
              setCopyContentImg={setCopyContentImg}
              contentUrl={oneImg.image_url}
              editMessage={editMessage}
            />
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
    </div>
  );
};

export default SelectFileEdit;
