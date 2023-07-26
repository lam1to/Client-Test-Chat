import { Socket } from "socket.io-client";
import { IChatWithUser } from "../types/IChat";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { IUseSocket } from "../components/Chat/Chat";

export const useFuncChat = () => {
  const user = useAppSelector(selectUser);
  const blockUser = (socket: Socket, chat: IChatWithUser) => {
    socket.emit("createBlockUser", {
      idUserWhoBlocked: user.user.id,
      idUserWhoWasBlocked: chat.users[0].id,
    });
  };
  const removeF = (socket: Socket, chat: IChatWithUser) => {
    socket.emit("deleteChat", chat.id);
  };
  const unblockUser = (socket: Socket, chat: IChatWithUser) => {
    socket.emit("removeBlockUser", {
      idUserWhoBlocked: user.user.id,
      idUserWhoWasBlocked: chat.users[0].id,
    });
  };
  const left = (socket: Socket, chat: IChatWithUser) => {
    socket.emit("createLeftChat", {
      idUsers: user.user.id,
      idChat: chat.id,
    });
    console.log("left press");
  };
  const join = (socket: Socket, chat: IChatWithUser) => {
    socket.emit("removeLeftChat", {
      idUsers: user.user.id,
      idChat: chat.id,
    });
    console.log("join press");
  };
  const isBlockedOrBlockerF = (
    selectChats: IChatWithUser,
    blocked: IUseSocket<string>,
    blocker: IUseSocket<string>
  ) => {
    if (selectChats.type === "DM") {
      const isBlockedUser = blocked.masT.some(
        (one) => one === selectChats.users[0].id
      );
      const isBlocker = blocker.masT.some(
        (one) => one === selectChats.users[0].id
      );
      const isBlockedOrBlocker: string =
        isBlockedUser && isBlocker
          ? "blockedBlocker"
          : isBlockedUser
          ? "blocked"
          : isBlocker
          ? "blocker"
          : "ok";
      return isBlockedOrBlocker;
    }
    return "ok";
  };
  const isLeft = (leftChat: IUseSocket<string>, selectChats: IChatWithUser) => {
    const isLeftB: boolean = leftChat.masT.some(
      (one) => one === selectChats.id
    );
    return isLeftB;
  };
  return {
    blockUser: blockUser,
    removeF: removeF,
    unblockUser: unblockUser,
    left: left,
    join: join,
    isBlockedOrBlockerF: isBlockedOrBlockerF,
    isLeft: isLeft,
  };
};
