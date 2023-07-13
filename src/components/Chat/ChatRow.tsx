import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { IAllChatWithUser, IChat } from "../../types/IChat";
import OneChat from "./OneChat";
import st from "../../styles/oneChat.module.css";
import { Socket } from "socket.io-client";

export interface PoropsChatRow {
  chats: IAllChatWithUser[];
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
  socket: Socket;
  setHidden?: Dispatch<SetStateAction<boolean>>;
  blockedUsersId: string[];
  blockersId: string[];
}
const ChatRow: FC<PoropsChatRow> = ({
  chats,
  setSelectChats,
  socket,
  setHidden,
  blockedUsersId,
  blockersId,
}) => {
  const isBlockedOrBlockerF = (oneChat: IAllChatWithUser) => {
    if (oneChat.type === "DM") {
      const isBlockedUser = blockedUsersId.some(
        (one) => one === oneChat.users[0].id
      );
      const isBlocker = blockersId.some((one) => one === oneChat.users[0].id);
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
  useEffect(() => {
    console.log("blockedUsersId", blockedUsersId);
    console.log("blockersId", blockersId);
  }, [blockedUsersId, blockersId]);
  return (
    <div className={st.chatrow}>
      {chats?.map((one, i) => (
        <OneChat
          blackList={isBlockedOrBlockerF(one)}
          setHidden={setHidden}
          socket={socket}
          key={i}
          oneChat={one}
          setSelectChats={setSelectChats}
        />
      ))}
    </div>
  );
};

export default ChatRow;
