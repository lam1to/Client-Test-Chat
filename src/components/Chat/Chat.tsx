import React, {
  FC,
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
} from "react";
import iconAllMessage from "../../public/chat.png";
import st from "../../styles/chat.module.css";
import MainChat from "./MainChat";
import { findAllLeftChat, findCharForUser } from "../../http/chat.services";
import { IAllChatWithUser, IChat } from "../../types/IChat";
import { io } from "socket.io-client";
import { useAppSelector } from "../../Hooks/redux";
import ChatSideMenu from "./ChatSideMenu";
import ChatSideMenuHiden from "./ChatSideMenuHiden";
import {
  findUserWhoBlockedMe,
  findUserWhoWasBlockedMe,
} from "../../http/blockUser.services";
import { selectUser } from "../../store/Reducers/UserSlice";
import { useSocket } from "../../Hooks/useSocket";

const socket = io("http://localhost:4200/chatSocket");

export interface IUseSocket<T> {
  masT: T[];
  setMasT: Dispatch<SetStateAction<T[]>>;
  addItem: (content: T) => void;
  deleteItem: (content: T) => void;
}
const Chat: FC = () => {
  const [chats, setChats] = useState<IAllChatWithUser[]>(
    [] as IAllChatWithUser[]
  );
  const [selectChats, setSelectChats] = useState<IAllChatWithUser>(
    {} as IAllChatWithUser
  );
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
  const user = useAppSelector(selectUser);
  const isBlockedOrBlockerF = () => {
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

  const chatCreate = (content: IAllChatWithUser) => {
    setChats((chats) => {
      if (chats.length === 0) {
        return [...chats, content];
      }
      if (chats.length > 0 && content.id !== chats[chats.length - 1].id) {
        return [...chats, content];
      }
      return chats;
    });
  };
  const chatDelete = (deleteChat: IAllChatWithUser) => {
    setChats((chats) =>
      chats.filter((OneChat) => {
        return OneChat.id !== deleteChat.id;
      })
    );
    setSelectChats({} as IAllChatWithUser);
  };
  useEffect(() => {
    socket.on(`chatCreate${user.user.id}`, chatCreate);
    socket.on(`chatDelete${user.user.id}`, chatDelete);
    getChat();
    return () => {
      socket.off(`chatCreate${user.user.id}`, chatCreate);
      socket.off(`chatDelete${user.user.id}`, chatDelete);
    };
  }, []);
  const getChat = async () => {
    await findCharForUser().then((data) => setChats(data));
  };
  const isLeft = () => {
    const isLeftB: boolean = leftChat.masT.some(
      (one) => one === selectChats.id
    );
    return isLeftB;
  };
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <div className={st.chat}>
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
          setChats={setChats}
          blockersId={blocker.masT}
          blockedUsersId={blocked.masT}
          socket={socket}
          chats={chats}
          setSelectChats={setSelectChats}
          leftChatId={leftChat.masT}
        />
        {hidden && (
          <ChatSideMenu
            setChats={setChats}
            blockersId={blocker.masT}
            blockedUsersId={blocked.masT}
            socket={socket}
            chats={chats}
            setSelectChats={setSelectChats}
            leftChatId={leftChat.masT}
          />
        )}
        <MainChat
          blackList={isBlockedOrBlockerF()}
          socket={socket}
          chat={selectChats}
          isLeft={isLeft()}
        />
      </div>
    </div>
  );
};

export default Chat;
