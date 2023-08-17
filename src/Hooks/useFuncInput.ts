import { Dispatch, SetStateAction, useState } from "react";
import { ISelectFile } from "../components/Chat/MainChat/Input/Input";
import { removeFile, uploadFile } from "../http/message.service";
import {
  IContentImg,
  IEditMessageWithImg,
  IMessage,
  IMessageLoadingImgs,
  IStorageUrl,
} from "../types/IMessage";

export const useFuncInput = () => {
  const closeImg = (
    oneSelectFile: ISelectFile,
    setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>,
    selectFile: ISelectFile[]
  ) => {
    setSelectFile(
      selectFile.filter((oneFile) => oneFile.id !== oneSelectFile.id)
    );
  };
  const funcReader = (selectFile: File) => {
    return URL.createObjectURL(selectFile);
  };

  const findUrlWhichWasAdded = (
    editMessage: IMessage,
    copyContentImg: IEditMessageWithImg[],
    contentUrl: string
  ) => {
    console.log("contentUrl = ", contentUrl);
    const one = 1;
    if (editMessage.contentImg) {
      const copyMessageContentImg: IContentImg[] = editMessage.contentImg;
      const dataWhichAdd: IEditMessageWithImg[] = copyContentImg.filter(
        (oneCopyImg) => {
          const isConsists =
            Object.keys(
              copyMessageContentImg.filter(
                (oneContentImg) =>
                  oneContentImg.image_url === oneCopyImg.image_url
              )
            ).length !== 0;

          if (!isConsists) return oneCopyImg;
        }
      );
      console.log("dataWichAdd = ", dataWhichAdd);
      console.log(
        "входит ли = ",
        dataWhichAdd.some((oneData) => oneData.image_url === contentUrl)
      );
      return dataWhichAdd.some((oneData) => oneData.image_url === contentUrl);
    }
  };

  const uploadNewFile = async (
    selectFile: ISelectFile[],
    setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>,
    setIsLoadingImgs: Dispatch<SetStateAction<IMessageLoadingImgs[]>>,
    setCopyContentImg: Dispatch<SetStateAction<IEditMessageWithImg[]>>
  ) => {
    setIsLoadingImgs([
      ...selectFile.map((oneSelectFile, i) => {
        return { id: i, isLoading: true };
      }),
    ]);

    const formData = new FormData();
    for (let i = 0; i < selectFile.length; i++) {
      formData.append("file", selectFile[i].file);
      await uploadFile(formData).then((data) => {
        setIsLoadingImgs((isLoadingImgs) =>
          isLoadingImgs.map((oneLoadingImgs) => {
            oneLoadingImgs.id === i && (oneLoadingImgs.isLoading = false);
            return oneLoadingImgs;
          })
        );
        setCopyContentImg((copyContentImg) => [
          ...copyContentImg,
          { image_url: data.imgUrl },
        ]);
        console.log("загрузило файл = ", selectFile[i]);
      });
      formData.delete("file");
    }
    setSelectFile([] as ISelectFile[]);
  };

  const closeEditOneContentImg = (
    editMessage: IMessage,
    copyContentImg: IEditMessageWithImg[],
    setCopyContentImg: Dispatch<SetStateAction<IEditMessageWithImg[]>>,
    contentUrl: string
  ) => {
    if (findUrlWhichWasAdded(editMessage, copyContentImg, contentUrl)) {
      removeFile({ image_url: contentUrl });
    }
    setCopyContentImg([
      ...copyContentImg.filter(
        (oneImageUrl) => oneImageUrl.image_url !== contentUrl
      ),
    ]);
  };

  const arrayMove = <Type>(
    selectFile: Type[],
    oldIndex: number,
    newIndex: number
  ) => {
    const newArray: Type[] = [...selectFile];
    const oldFile: Type = newArray[newIndex];
    newArray[newIndex] = newArray[oldIndex];
    newArray[oldIndex] = oldFile;
    return newArray;
  };

  const arrayMovea = (
    selectFile: ISelectFile[],
    oldIndex: number,
    newIndex: number
  ) => {
    const newArray: ISelectFile[] = [...selectFile];
    const oldFile: ISelectFile = newArray[newIndex];
    newArray[newIndex] = newArray[oldIndex];
    newArray[oldIndex] = oldFile;
    return newArray;
  };

  return {
    closeImg: closeImg,
    funcReader: funcReader,
    uploadNewFile: uploadNewFile,
    findUrlWhichWasAdded: findUrlWhichWasAdded,
    closeEditOneContentImg: closeEditOneContentImg,
    arrayMove: arrayMove,
  };
};
