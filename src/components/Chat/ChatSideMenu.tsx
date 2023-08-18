import React, { Dispatch, FC, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import ChatSearch from "./ChatSearch";
import ChatRow from "./ChatRow";
import { IChatWithUser } from "../../types/IChat";
import st from "../../styles/chat.module.css";
import { ILastMessage } from "../../types/IMessage";
export interface PropsChatSideMenu {
  chats: IChatWithUser[];
  setSelectChats: Dispatch<SetStateAction<IChatWithUser>>;
  socket: Socket;
  lastMessageChat: ILastMessage[];
  setLastMessageChat: Dispatch<SetStateAction<ILastMessage[]>>;
}
const ChatSideMenu: FC<PropsChatSideMenu> = ({
  chats,
  setSelectChats,
  socket,
  lastMessageChat,
  setLastMessageChat,
}) => {
  return (
    <div className={st.all_chat_block}>
      <ChatSearch socket={socket} />
      <div className={st.all_chat_block_users}>
        <ChatRow
          lastMessageChat={lastMessageChat}
          setLastMessageChat={setLastMessageChat}
          chats={chats}
          setSelectChats={setSelectChats}
        />
      </div>
    </div>
  );
};

export default ChatSideMenu;
