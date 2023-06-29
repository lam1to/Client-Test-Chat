import React, { FC, useEffect, useState } from "react";
import iconAllMessage from "../../public/chat.png";
import st from "../../styles/chat.module.css";
import { Link } from "react-router-dom";
import ChatRow from "./ChatRow";
import ChatSearch from "./ChatSearch";

const Chat: FC = () => {
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
            <ChatSearch />
            <div className="all_chat_block_users">
              <ChatRow />
            </div>
          </div>
          <div className={st.main_chat}>
            <div className="main_chat_header">header</div>
            <div className="main_chat_content">content</div>
            <div className="main_chat_input">input</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
