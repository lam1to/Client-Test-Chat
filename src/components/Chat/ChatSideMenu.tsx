import React, { Dispatch, FC, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import ChatSearch from "./ChatSearch";
import ChatRow from "./ChatRow";
import { IAllChatWithUser } from "../../types/IChat";
import st from "../../styles/chat.module.css";
export interface PropsChatSideMenu {
  chats: IAllChatWithUser[];
  setChats: Dispatch<SetStateAction<IAllChatWithUser[]>>;
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
  socket: Socket;
  blockedUsersId: string[];
  blockersId: string[];
  leftChatId: string[];
}
const ChatSideMenu: FC<PropsChatSideMenu> = ({
  chats,
  setSelectChats,
  socket,
  blockedUsersId,
  blockersId,
  leftChatId,
  setChats,
}) => {
  return (
    <div className={st.all_chat_block}>
      <ChatSearch socket={socket} />
      <div className={st.all_chat_block_users}>
        <ChatRow
          setChats={setChats}
          leftChatId={leftChatId}
          blockersId={blockersId}
          blockedUsersId={blockedUsersId}
          socket={socket}
          chats={chats}
          setSelectChats={setSelectChats}
        />
      </div>
    </div>
  );
};

export default ChatSideMenu;
