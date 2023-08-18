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
  console.log("lastMessage = ", lastMessage.lastMessageChat);
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
          lastMessageChat={lastMessage.lastMessageChat}
          setLastMessageChat={lastMessage.setLastMessageChat}
          socket={socket}
          chats={chats.masT}
          setSelectChats={setSelectChats}
        />
        {hidden && (
          <ChatSideMenu
            lastMessageChat={lastMessage.lastMessageChat}
            setLastMessageChat={lastMessage.setLastMessageChat}
            socket={socket}
            chats={chats.masT}
            setSelectChats={setSelectChats}
          />
        )}

        <MainChat
          lastMessageChat={lastMessage.lastMessageChat}
          setLastMessageChat={lastMessage.setLastMessageChat}
          blackList={funcChat.isBlockedOrBlockerF(
            selectChats,
            blocked,
            blocker
          )}
          socket={socket}
          chat={selectChats}
          isLeft={funcChat.isLeft(leftChat, selectChats)}
          editLeftChat={chats.editLeftChat}
        />
      </div>
    </div>
  );
};

export default Chat;
