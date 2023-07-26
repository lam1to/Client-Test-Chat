import { Socket } from "socket.io-client";
import { PropsUseSocketMessage } from "../components/Chat/MainChat/MainChat";
import { IMessage } from "../types/IMessage";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { Dispatch, SetStateAction } from "react";
import { Position } from "../components/Chat/MainChat/OneMessage";

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
    chatId: string
  ) => {
    socket.emit("createGateway", {
      userId: user.user.id,
      chatId: chatId,
      content: contentRef.current?.value,
    });
    contentRef.current.value = "";
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
    setEditMessage: Dispatch<SetStateAction<IMessage>>
  ) => {
    setOverflow("auto");
    contentRef.current.focus();
    contentRef.current.value = message.content;
    setEditMessage(message);
  };

  const deleteF = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    setOverflow: Dispatch<SetStateAction<string>>,
    removeMessage: (message: IMessage) => void,
    setDropDown: Dispatch<SetStateAction<boolean>>,
    message: IMessage
  ) => {
    e.stopPropagation();
    setOverflow("auto");
    removeMessage(message);
    setDropDown(false);
  };
  return {
    FilterMessages: FilterMessages,
    editMessageF: editMessageF,
    createMessageF: createMessageF,
    onVisible: onVisible,
    editF: editF,
    deleteF: deleteF,
  };
};
