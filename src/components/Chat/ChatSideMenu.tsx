import React, { Dispatch, FC, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import ChatSearch from "./ChatSearch";
import ChatRow from "./ChatRow";
import { IChatWithUser } from "../../types/IChat";
import st from "../../styles/chat.module.css";
import { ILastMessage, IMessageRead } from "../../types/IMessage";
import { IUseSocket } from "./Chat";
import { IUseChatSocket, IUseUnreadMessage } from "../../types/IUse";
export interface PropsChatSideMenu {
  chats: IUseChatSocket;
  setSelectChats: Dispatch<SetStateAction<IChatWithUser>>;
  socket: Socket;
  setLastMessageChat: Dispatch<SetStateAction<ILastMessage[]>>;
  lastMessageChat: ILastMessage[];
  leftChat: IUseSocket<string>;
}
const ChatSideMenu: FC<PropsChatSideMenu> = ({
  chats,
  setSelectChats,
  socket,
  lastMessageChat,
  setLastMessageChat,
  leftChat,
}) => {
  return (
    <div className={st.all_chat_block}>
      <ChatSearch socket={socket} />
      <div className={st.all_chat_block_users}>
        <ChatRow
          leftChat={leftChat}
          socket={socket}
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
