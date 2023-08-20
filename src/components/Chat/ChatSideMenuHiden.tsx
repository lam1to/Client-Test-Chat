import React, { Dispatch, FC, SetStateAction, useState } from "react";
import iconAllMessage from "../../public/chat.png";
import st from "../../styles/chat.module.css";
import { IChatWithUser } from "../../types/IChat";
import { Socket } from "socket.io-client";
import ChatSideMenu from "./ChatSideMenu";
import ChatSearch from "./ChatSearch";
import ChatRow from "./ChatRow";
import closeImg from "../../public/close.png";
import { ILastMessage } from "../../types/IMessage";
import { IUseSocket } from "./Chat";
export interface PropsChatSideMenu {
  chats: IChatWithUser[];
  setSelectChats: Dispatch<SetStateAction<IChatWithUser>>;
  socket: Socket;
  lastMessageChat: ILastMessage[];
  setLastMessageChat: Dispatch<SetStateAction<ILastMessage[]>>;
  leftChat: IUseSocket<string>;
}

const ChatSideMenuHiden: FC<PropsChatSideMenu> = ({
  chats,
  setSelectChats,
  socket,
  lastMessageChat,
  setLastMessageChat,
  leftChat,
}) => {
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <div className={st.chat_drop_menu_img}>
      <img
        onClick={() => {
          setHidden(false);
        }}
        src={iconAllMessage}
        alt=""
        className={st.chat_drop_menu_img_img}
      />
      <div
        className={
          hidden ? st.all_chat_block_hidden : st.all_chat_block_hidden_activ
        }
      >
        <div
          onClick={() => {
            setHidden(true);
          }}
          className={st.close_hidden_menu}
        >
          <img src={closeImg} alt="" />
        </div>
        <ChatSearch setHidden={setHidden} socket={socket} />
        <div className={st.all_chat_block_users}>
          <ChatRow
            leftChat={leftChat}
            socket={socket}
            lastMessageChat={lastMessageChat}
            setHidden={setHidden}
            chats={chats}
            setSelectChats={setSelectChats}
            setLastMessageChat={setLastMessageChat}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSideMenuHiden;
