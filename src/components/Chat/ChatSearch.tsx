import React, { useEffect, useState } from "react";
import st from "../../styles/chat.module.css";
import { IuserChat } from "../../types/IUser";
import { getAllUsers } from "../../http/user.services";
const ChatSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IuserChat[]>();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
  }, []);
  const SearchUser = users?.filter((oneUser) => {
    return (
      oneUser.name.toLowerCase().includes(search.toLowerCase()) ||
      oneUser.lastName.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <form className={st.block_chat_search_form}>
      <input
        autoComplete="off"
        type="text"
        value={search}
        name="search"
        placeholder="Search users"
        className={st.chat_search_input}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setIsSearch(true)}
        onBlur={() => setIsSearch(false)}
      />
      <div
        className={`${
          isSearch === true ? st.block_list_user_true : st.block_list_user_false
        } ${st.block_list_user}`}
      >
        <ul className={st.list_user}>
          {SearchUser?.map((oneUser, i) => (
            <li key={i}>
              <button className={st.search_button}>
                <div className={st.onechat_block}>
                  <div className={st.onechat_block_img}>
                    <img src={oneUser.avatarPath} alt="" />
                  </div>
                  <div className={st.onechat_block_name}>{oneUser.name}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default ChatSearch;
