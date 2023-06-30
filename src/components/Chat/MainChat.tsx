import React, { FC, useEffect, useState } from "react";
import st from "../../styles/mainChat.module.css";
import { IAllChatWithUser } from "../../types/IChat";

export interface PropsMainChat {
  chat: IAllChatWithUser;
}
const MainChat: FC<PropsMainChat> = ({ chat }) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  useEffect(() => {
    setIsEmpty(Object.keys(chat).length === 0);
  }, [chat, isEmpty]);
  return (
    <div className={st.main_chat_container}>
      {!isEmpty ? (
        <div className={st.main_chat}>
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
          </div>
          <div className={st.main_chat_content}>a</div>
          <div className={st.main_chat_input}>
            <form action="" className={st.main_chat_form}>
              <input
                placeholder="Введите сообщение "
                type="text"
                className={st.main_chat_form_input}
              />
              <button className={st.main_chat_form_button}>Отправить</button>
            </form>
          </div>
        </div>
      ) : (
        <div className={st.emptyChat}>Чат не открыт</div>
      )}
    </div>
  );
};

export default MainChat;
