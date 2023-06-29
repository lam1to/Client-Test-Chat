import React, { FC, useEffect, useState } from "react";
import iconAllMessage from "../../public/chat.png";
import st from "../../styles/chat.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Hooks/redux";
import { findCharForUser } from "../../http/chat.services";
import { IAllChatWithUser } from "../../types/IChat";
import { IuserChat } from "../../types/IUser";

const Chat: FC = () => {
  const [data, setData] = useState<IAllChatWithUser[]>();
  useEffect(() => {
    findCharForUser().then((data) => setData(data));
    console.log("data in chat = ", data);
  }, []);

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
            <form className={st.block_chat_search_form}>
              <input
                type="text"
                // value={user.password}
                name="search"
                placeholder="Search users"
                className={st.chat_search_input}
                // onChange={(e) =>
                //   setUser((prev) => ({ ...prev, password: e.target.value }))
                // }
              />
            </form>
            <div className="all_chat_block_users">
              {data?.map((one) => (
                <div>{one.users?.map((users) => users.name)}</div>
              ))}
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
