import React, { Dispatch, FC, SetStateAction } from "react";
import st from "../../styles/mainChat.module.css";
import { IAllChatWithUser } from "../../types/IChat";
import searchPngg from "../../public/search_symbol.png";

interface PropsMainChatHeader {
  chat: IAllChatWithUser;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const MainChatHeader: FC<PropsMainChatHeader> = ({
  chat,
  filter,
  setFilter,
}) => {
  return (
    <div className={st.main_chat_header}>
      <div className={st.main_chat_header_name}>
        {chat.users.map((one, i) => (
          <div className={st.main_chat_header_name_block} key={i}>
            {chat.users.length == 1
              ? chat.type + ": " + one.name + " " + one.lastName
              : chat.users.length - 1 !== i
              ? chat.type + ": " + one.name + ", "
              : one.name}
          </div>
        ))}
      </div>
      <div className={st.main_chat_header_search}>
        <div className={st.main_chat_header_search_block}>
          <img className={st.main_chat_header_search_img} src={searchPngg} />
          <div className={st.main_chat_header_search_block_input}>
            <input
              placeholder="Поиск сообщений"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={st.main_chat_header_search_input}
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatHeader;
