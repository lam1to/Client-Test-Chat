import React, {
  FC,
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
} from "react";
import iconAllMessage from "../../public/chat.png";
import st from "../../styles/chat.module.css";
import MainChat from "./MainChat/MainChat";
import { findAllLeftChat, findCharForUser } from "../../http/chat.services";
import { IChatWithUser, IChat, ILeftChatUser } from "../../types/IChat";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import ChatSideMenu from "./ChatSideMenu";
import ChatSideMenuHiden from "./ChatSideMenuHiden";
import { useSocket } from "../../Hooks/useSocket";
import { useSocketChats } from "../../Hooks/useSocketChats";
import { useFuncChat } from "../../Hooks/useFuncChat";
import { useLastMessage } from "../../Hooks/useLastMessage";
import { IMessageRead } from "../../types/IMessage";
import { getAllCountUnreadMessage } from "../../http/message.service";
import { useUnreadMessage } from "../../Hooks/useUnreadMessage";
import { IUseUnreadMessage } from "../../types/IUse";

const socket = io("http://localhost:4200/chatSocket");

export interface IUseSocket<T> {
  masT: T[];
  setMasT: Dispatch<SetStateAction<T[]>>;
}
export interface IUseSocketChat {
  masT: IChatWithUser[];
  setMasT: Dispatch<SetStateAction<IChatWithUser[]>>;
  editLeftChat: (oneLeftChat: ILeftChatUser, flag: boolean) => void;
}
const Chat: FC = () => {
  const [selectChats, setSelectChats] = useState<IChatWithUser>(
    {} as IChatWithUser
  );

  const lastMessage = useLastMessage(socket);
  const chats: IUseSocketChat = useSocketChats(socket, setSelectChats);

  const blocked: IUseSocket<string> = useSocket<string>(
    "newBlockedUser",
    "deleteBlockedUser",
    socket,
    "blocked"
  );
  const blocker: IUseSocket<string> = useSocket<string>(
    "newBlocker",
    "deleteBlocker",
    socket,
    "blocker"
  );

  const leftChat: IUseSocket<string> = useSocket<string>(
    "newLeftChat",
    "deleteLeftChat",
    socket,
    "leftChat"
  );
  const funcChat = useFuncChat();
  const [hidden, setHidden] = useState<boolean>(true);
  const unreadMessage = useUnreadMessage(
    socket,
    chats,
    selectChats,
    funcChat.isLeft(leftChat, selectChats)
  );
  return (
    <div className={`${st.chat} chat`}>
      <div className={st.func_block}>
        <div className={st.func_row}>
          <div
            onClick={() => setHidden(hidden ? false : true)}
            className={st.func_row_all_messages}
          >
            <img src={iconAllMessage} alt="" />
          </div>
        </div>
      </div>

      <div className={st.main_block}>
        <ChatSideMenuHiden
          leftChat={leftChat}
          lastMessageChat={lastMessage.lastMessageChat}
          setLastMessageChat={lastMessage.setLastMessageChat}
          socket={socket}
          chats={chats}
          setSelectChats={setSelectChats}
        />
        {hidden && (
          <ChatSideMenu
            leftChat={leftChat}
            lastMessageChat={lastMessage.lastMessageChat}
            setLastMessageChat={lastMessage.setLastMessageChat}
            socket={socket}
            chats={chats}
            setSelectChats={setSelectChats}
          />
        )}

        <MainChat
          chats={chats}
          blocked={blocked}
          blocker={blocker}
          setSelectChat={setSelectChats}
          blackList={funcChat.isBlockedOrBlockerF(
            selectChats,
            blocked,
            blocker
          )}
          socket={socket}
          chat={selectChats}
          leftChat={leftChat}
          isLeft={funcChat.isLeft(leftChat, selectChats)}
          editLeftChat={chats.editLeftChat}
        />
      </div>
    </div>
  );
};

export default Chat;
