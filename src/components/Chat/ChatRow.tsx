import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { IAllChatWithUser, IChat, ILeftChatUser } from "../../types/IChat";
import OneChat from "./OneChat";
import st from "../../styles/oneChat.module.css";
import { Socket } from "socket.io-client";

export interface PoropsChatRow {
  chats: IAllChatWithUser[];
  setChats: Dispatch<SetStateAction<IAllChatWithUser[]>>;
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
  socket: Socket;
  setHidden?: Dispatch<SetStateAction<boolean>>;
  blockedUsersId: string[];
  blockersId: string[];
  leftChatId: string[];
}
const ChatRow: FC<PoropsChatRow> = ({
  chats,
  setChats,
  setSelectChats,
  socket,
  setHidden,
  blockedUsersId,
  blockersId,
  leftChatId,
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
  const editLeftChat = (oneLeftChat: ILeftChatUser, flag: boolean) => {
    if (flag) {
      setChats([
        ...chats.map((oneChat) => {
          if (oneChat.id === oneLeftChat.chatId) {
            oneChat.users = oneChat.users.filter((oneUser) => {
              return oneUser.id !== oneLeftChat.userId;
            });
          }
          return oneChat;
        }),
      ]);
    } else {
      setChats([
        ...chats.map((oneChat) => {
          if (
            oneChat.id === oneLeftChat.chatId &&
            oneLeftChat.user &&
            !oneChat.users.some(
              (oneUser) => oneUser.id === oneLeftChat.user?.id
            )
          ) {
            oneChat.users = [...oneChat.users, oneLeftChat.user];
          }
          return oneChat;
        }),
      ]);
    }
  };
  const leftIsChat = (oneChat: IAllChatWithUser) => {
    if (oneChat.type === "GroupM") {
      const isLeftChat = leftChatId.some((one) => one === oneChat.id);
      return isLeftChat;
    }
  };
  return (
    <div className={st.chatrow}>
      {chats?.map((one, i) => (
        <OneChat
          editLeftChat={editLeftChat}
          leftIsChat={leftIsChat(one)}
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
