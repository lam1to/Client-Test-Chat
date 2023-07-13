import React, { FC, useEffect, useState } from "react";
import iconAllMessage from "../../public/chat.png";
import st from "../../styles/chat.module.css";
import MainChat from "./MainChat";
import { findCharForUser } from "../../http/chat.services";
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

const socket = io("http://localhost:4200/chatSocket");

const Chat: FC = () => {
  const [chats, setChats] = useState<IAllChatWithUser[]>(
    [] as IAllChatWithUser[]
  );
  const [selectChats, setSelectChats] = useState<IAllChatWithUser>(
    {} as IAllChatWithUser
  );
  const [blockedUsersId, setBlockedUsersId] = useState<string[]>(
    [] as string[]
  );
  const [blockersId, setBlockersId] = useState<string[]>([] as string[]);
  const user = useAppSelector(selectUser);
  const isBlockedOrBlockerF = () => {
    if (selectChats.type === "DM") {
      const isBlockedUser = blockedUsersId.some(
        (one) => one === selectChats.users[0].id
      );
      const isBlocker = blockersId.some(
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

  const newBlocker = (blockerId: string) => {
    setBlockersId([...blockersId, blockerId]);
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
  const chatDelete = (deleteChat: IChat) => {
    setChats((chats) =>
      chats.filter((OneChat) => {
        return OneChat.id !== deleteChat.id;
      })
    );
    setSelectChats({} as IAllChatWithUser);
  };
  const newBlockedUser = (blockedUserId: string) => {
    console.log("в сокете у нас такие blockedUser= ", blockedUsersId);
    setBlockedUsersId((blockedUsersId) => {
      if (blockedUsersId.length === 0) {
        return [...blockedUsersId, blockedUserId];
      }
      if (
        blockedUsersId.length > 0 &&
        blockedUsersId[blockedUsersId.length - 1] !== blockedUserId
      ) {
        return [...blockedUsersId, blockedUserId];
      }
      return blockedUsersId;
    });
  };
  const deleteBlockedUser = (blockedUserId: string) => {
    setBlockedUsersId((blockedUsersId) =>
      blockedUsersId.filter((oneBlockedUserId) => {
        return oneBlockedUserId !== blockedUserId;
      })
    );
  };
  const deleteBlocker = (blockerId: string) => {
    setBlockersId((blockersId) =>
      blockersId.filter((oneBlockerId) => {
        return oneBlockerId !== blockerId;
      })
    );
  };
  useEffect(() => {
    socket.on(`chatCreate${user.user.id}`, chatCreate);
    socket.on(`chatDelete${user.user.id}`, chatDelete);
    socket.on(`newBlockedUser${user.user.id}`, newBlockedUser);
    socket.on(`newBlocker${user.user.id}`, newBlocker);
    socket.on(`deleteBlockedUser${user.user.id}`, deleteBlockedUser);
    socket.on(`deleteBlocker${user.user.id}`, deleteBlocker);
    getChat();
    console.log("blockedUsers = ", blockedUsersId);
    return () => {
      socket.off(`chatCreate${user.user.id}`, chatCreate);
      socket.off(`chatDelete${user.user.id}`, chatDelete);
      socket.off(`newBlockedUser${user.user.id}`, newBlockedUser);
      socket.off(`newBlocker${user.user.id}`, newBlocker);
      socket.off(`deleteBlockedUser${user.user.id}`, deleteBlockedUser);
      socket.off(`deleteBlocker${user.user.id}`, deleteBlocker);
    };
  }, []);
  const getChat = async () => {
    await findCharForUser().then((data) => setChats(data));
    await findUserWhoWasBlockedMe().then((data) => setBlockedUsersId(data));
    await findUserWhoBlockedMe().then((data) => setBlockersId(data));
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
          blockersId={blockersId}
          blockedUsersId={blockedUsersId}
          socket={socket}
          chats={chats}
          setSelectChats={setSelectChats}
        />
        {hidden && (
          <ChatSideMenu
            blockersId={blockersId}
            blockedUsersId={blockedUsersId}
            socket={socket}
            chats={chats}
            setSelectChats={setSelectChats}
          />
        )}
        <MainChat
          blackList={isBlockedOrBlockerF()}
          socket={socket}
          chat={selectChats}
        />
      </div>
    </div>
  );
};

export default Chat;
