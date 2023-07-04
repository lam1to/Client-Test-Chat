import React, { FC, useEffect, useState } from "react";
import iconAllMessage from "../../public/chat.png";
import st from "../../styles/chat.module.css";
import { Link } from "react-router-dom";
import ChatRow from "./ChatRow";
import ChatSearch from "./ChatSearch";
import MainChat from "./MainChat";
import { findCharForUser } from "../../http/chat.services";
import { IAllChatWithUser } from "../../types/IChat";
import { io } from "socket.io-client";
import { useAppSelector } from "../../Hooks/redux";

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
      console.log("получили вот это = ", content);
      setChats((chats) => [...chats, content]);
    });
    getChat();
  }, [chats.length]);
  const getChat = async () => {
    await findCharForUser().then((data) => setChats(data));
  };
  return (
    <div>
      <div className={st.chat}>
        <div className={st.func_block}>
          <div className={st.func_row}>
            <div className={st.func_row_all_messages}>
              <Link to={""}>
                <img src={iconAllMessage} alt="" />
              </Link>
            </div>
          </div>
        </div>
        <div className={st.main_block}>
          <div className={st.all_chat_block}>
            <ChatSearch socket={socket} />
            <div className="all_chat_block_users">
              <ChatRow chats={chats} setSelectChats={setSelectChats} />
            </div>
          </div>
          <MainChat socket={socket} chat={selectChats} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
