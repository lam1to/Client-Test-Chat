import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { findAllLeftChat, findCharForUser } from "../http/chat.services";
import {
  findUserWhoBlockedMe,
  findUserWhoWasBlockedMe,
} from "../http/blockUser.services";

export function useSocket<T>(
  messageAdd: string,
  messageDelete: string,
  socket: Socket,
  flag: string,
  chatId?: string
) {
  const [masT, setMasT] = useState<T[]>([] as T[]);
  const user = useAppSelector(selectUser);
  useEffect(() => {
    getMasT();
    socket.on(`${messageAdd}${user.user.id}`, addItem);
    socket.on(`${messageDelete}${user.user.id}`, deleteItem);
    return () => {
      socket.off(`${messageAdd}${user.user.id}`, addItem);
      socket.off(`${messageDelete}${user.user.id}`, deleteItem);
    };
  }, []);
  const getMasT = async () => {
    switch (flag) {
      case "chat":
        await findCharForUser().then((data) => setMasT(data));
        break;
      case "blocked":
        await findUserWhoWasBlockedMe().then((data) => setMasT(data));
        break;
      case "blocker":
        await findUserWhoBlockedMe().then((data) => setMasT(data));
        break;
      case "leftChat":
        await findAllLeftChat().then((data) => setMasT(data));
        break;
      default:
        break;
    }
  };
  const addItem = (content: T) => {
    setMasT((masT) => {
      if (masT.length >= 0 && masT[masT.length - 1] !== content) {
        return [...masT, content];
      }
      return masT;
    });
  };
  const deleteItem = (content: T) => {
    setMasT((masT) =>
      masT.filter((oneMasT) => {
        return oneMasT !== content;
      })
    );
  };
  return { masT, setMasT, addItem, deleteItem };
}
