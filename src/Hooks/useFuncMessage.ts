import { Socket } from "socket.io-client";
import { PropsUseSocketMessage } from "../components/Chat/MainChat/MainChat";
import {
  IEditMessageWithImg,
  IMessage,
  IMessageLoadingImgs,
  IStorageUrl,
} from "../types/IMessage";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { Dispatch, SetStateAction, useState } from "react";
import {
  createMessage,
  createMessageImg,
  uploadFile,
} from "../http/message.service";
import { ISelectFile } from "../components/Chat/MainChat/Input/Input";
import { Position } from "./useDataMessage";

export const useFuncMessage = () => {
  const user = useAppSelector(selectUser);
  const FilterMessages = (
    filter: string,
    messages: PropsUseSocketMessage
  ): IMessage[] => {
    if (filter.length > 0) {
      const filterMessages = messages.messages?.filter((oneMessage) => {
        return oneMessage.content
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase());
      });
      return filterMessages;
    }
    return messages.messages;
  };
  const createMessageF = async (
    socket: Socket,
    contentRef: React.MutableRefObject<HTMLInputElement>,
    selectFile: ISelectFile[],
    setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>,
    chatId: string,
    setIsLoadingMessage: Dispatch<SetStateAction<boolean>>,
    setIsLoadingImgs: Dispatch<SetStateAction<IMessageLoadingImgs[]>>
  ) => {
    if (Object.keys(selectFile).length !== 0) {
      setIsLoadingMessage(true);
      let masUrl: IStorageUrl[] = [] as IStorageUrl[];
      const formData = new FormData();
      const copySelectFile: ISelectFile[] = selectFile;
      setSelectFile([] as ISelectFile[]);
      const content = contentRef.current.value;
      contentRef.current.value = "";
      for (let i = 0; i < selectFile.length; i++) {
        formData.append("file", copySelectFile[i].file);
        await uploadFile(formData).then((data) => {
          masUrl = [...masUrl, data];
          console.log("загрузило файл = ", selectFile[i]);
          setIsLoadingImgs((isLoadingImgs) =>
            isLoadingImgs.map((oneLoadingImgs) => {
              oneLoadingImgs.id === i && (oneLoadingImgs.isLoading = false);
              return oneLoadingImgs;
            })
          );
        });
        formData.delete("file");
      }
      socket.emit("createMessageWithImg", {
        userId: user.user.id,
        chatId: chatId,
        content: content,
        masUrl: masUrl,
      });
      setIsLoadingMessage(false);
    } else {
      if (
        contentRef.current?.value == "" &&
        Object.keys(selectFile).length === 0
      )
        return;
      else
        socket.emit("createGateway", {
          userId: user.user.id,
          chatId: chatId,
          content: contentRef.current?.value,
        });
      contentRef.current.value = "";
    }
  };
  const editMessageF = (
    socket: Socket,
    contentRef: React.MutableRefObject<HTMLInputElement>,
    chatId: string,
    editMessage: IMessage,
    setEditMessage: Dispatch<SetStateAction<IMessage>>
  ) => {
    socket.emit("updateMessage", {
      messageId: editMessage.id,
      content: contentRef.current?.value,
      chatId: chatId,
      userId: user.user.id,
    });
    setEditMessage({} as IMessage);
    contentRef.current.value = "";
  };

  const editMessageWithImg = (
    copyContentImg: IEditMessageWithImg[],
    socket: Socket,
    contentRef: React.MutableRefObject<HTMLInputElement>,
    chatId: string,
    editMessage: IMessage,
    setEditMessage: Dispatch<SetStateAction<IMessage>>
  ) => {
    console.log("нам передали такие url = ", copyContentImg);
    socket.emit("updateMessageWithImg", {
      messageId: editMessage.id,
      content: contentRef.current?.value,
      chatId: chatId,
      userId: user.user.id,
      image_url: [...copyContentImg.map((oneUrl) => oneUrl.image_url)],
    });
    setEditMessage({} as IMessage);
    contentRef.current.value = "";
  };

  const onVisible = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setOverflow: Dispatch<SetStateAction<string>>,
    setXyPosistion: Dispatch<SetStateAction<Position>>,
    dropDown: boolean,
    setDropDown: Dispatch<SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    setOverflow("hidden");
    const positionChange = {
      x: e.pageX,
      y: e.pageY,
    };
    setXyPosistion(positionChange);
    setDropDown(dropDown ? false : true);
  };
  const editF = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    setOverflow: Dispatch<SetStateAction<string>>,
    contentRef: React.MutableRefObject<HTMLInputElement>,
    message: IMessage,
    setEditMessage: Dispatch<SetStateAction<IMessage>>,
    setReplyMessage: Dispatch<SetStateAction<IMessage>>
  ) => {
    setReplyMessage({} as IMessage);
    setOverflow("auto");
    contentRef.current.focus();
    contentRef.current.value = message.content;
    setEditMessage(message);
  };

  const deleteF = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    setOverflow: Dispatch<SetStateAction<string>>,
    setDropDown: Dispatch<SetStateAction<boolean>>,
    message: IMessage,
    socket: Socket
  ) => {
    e.stopPropagation();
    setOverflow("auto");
    removeMessage(message, socket);
    setDropDown(false);
  };
  const getTimeMessage = (message: IMessage) => {
    return message.createdAt.slice(11, 16);
  };
  const removeMessage = (message: IMessage, socket: Socket) => {
    socket.emit("deleteMessage", {
      userId: user.user.id,
      messageId: message.id,
      chatId: message.chatId,
    });
  };

  const replyMessage = (
    setOverflow: Dispatch<SetStateAction<string>>,
    contentRef: React.MutableRefObject<HTMLInputElement>,
    message: IMessage,
    setReplyMessage: Dispatch<SetStateAction<IMessage>>,
    setEditMessage?: Dispatch<SetStateAction<IMessage>>
  ) => {
    if (setEditMessage) setEditMessage({} as IMessage);
    console.log("ответить в funcMessage");
    setOverflow("auto");
    contentRef.current.focus();
    // contentRef.current.value = message.content;
    setReplyMessage(message);
  };

  const replyMessageF = async (
    selectFile: ISelectFile[],
    setSelectFile: Dispatch<SetStateAction<ISelectFile[]>>,
    socket: Socket,
    contentRef: React.MutableRefObject<HTMLInputElement>,
    chatId: string,
    replyMessage: IMessage,
    setReplyMessage: Dispatch<SetStateAction<IMessage>>,
    setIsLoadingImgs: Dispatch<SetStateAction<IMessageLoadingImgs[]>>
  ) => {
    console.log("выполнили ответ в input ");
    if (Object.keys(selectFile).length !== 0) {
      let masUrl: IStorageUrl[] = [] as IStorageUrl[];
      const formData = new FormData();
      const copySelectFile: ISelectFile[] = selectFile;
      setSelectFile([] as ISelectFile[]);
      const content = contentRef.current.value;
      contentRef.current.value = "";
      for (let i = 0; i < selectFile.length; i++) {
        formData.append("file", copySelectFile[i].file);
        await uploadFile(formData).then((data) => {
          masUrl = [...masUrl, data];
          console.log("загрузило файл = ", selectFile[i]);
          setIsLoadingImgs((isLoadingImgs) =>
            isLoadingImgs.map((oneLoadingImgs) => {
              oneLoadingImgs.id === i && (oneLoadingImgs.isLoading = false);
              return oneLoadingImgs;
            })
          );
        });
        formData.delete("file");
      }
      socket.emit("createReplyMessageWithImg", {
        userId: user.user.id,
        chatId: chatId,
        content: content,
        masUrl: masUrl,
        messageIdWasAnswered: replyMessage.id,
      });
      contentRef.current.value = "";
    } else {
      if (
        contentRef.current?.value == "" &&
        Object.keys(selectFile).length === 0
      )
        return;
      else
        socket.emit("createReplyMessage", {
          userId: user.user.id,
          chatId: chatId,
          content: contentRef.current?.value,
          messageIdWasAnswered: replyMessage.id,
        });
      contentRef.current.value = "";
      console.log("penis");
    }
    setReplyMessage({} as IMessage);
  };
  return {
    FilterMessages: FilterMessages,
    editMessageF: editMessageF,
    createMessageF: createMessageF,
    onVisible: onVisible,
    editF: editF,
    deleteF: deleteF,
    getTimeMessage: getTimeMessage,
    editMessageWithImg: editMessageWithImg,
    replyMessage: replyMessage,
    replyMessageF: replyMessageF,
  };
};
