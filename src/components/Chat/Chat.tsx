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
import { useOutsideClick } from "outsideclick-react";

const socket = io("http://localhost:4200/chatSocket");

const Chat: FC = () => {
  const [chats, setChats] = useState<IAllChatWithUser[]>(
    [] as IAllChatWithUser[]
  );
  const [selectChats, setSelectChats] = useState<IAllChatWithUser>(
    {} as IAllChatWithUser
  );
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    socket.on(`chatCreate${user.user.id}`, (content) => {
      setChats((chats) => {
        if (content.id !== chats[chats.length - 1].id) {
          return [...chats, content];
        }
        return chats;
      });
    });
    socket.on(`chatDelete${user.user.id}`, (deleteChat: IChat) => {
      setChats((chats) =>
        chats.filter((OneChat) => {
          return OneChat.id !== deleteChat.id;
        })
      );
      setSelectChats({} as IAllChatWithUser);
    });
    getChat();
  }, []);
  const getChat = async () => {
    await findCharForUser().then((data) => setChats(data));
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
          socket={socket}
          chats={chats}
          setSelectChats={setSelectChats}
        />
        {hidden && (
          <ChatSideMenu
            socket={socket}
            chats={chats}
            setSelectChats={setSelectChats}
          />
        )}
        <MainChat socket={socket} chat={selectChats} />
      </div>
    </div>
  );
};

export default Chat;
