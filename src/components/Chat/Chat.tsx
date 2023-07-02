import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import iconAllMessage from "../../public/chat.png";
import st from "../../styles/chat.module.css";
import { Link } from "react-router-dom";
import ChatRow from "./ChatRow";
import ChatSearch from "./ChatSearch";
import MainChat from "./MainChat";
import { findCharForUser } from "../../http/chat.services";
import { IAllChatWithUser } from "../../types/IChat";
import { IuserChat } from "../../types/IUser";

const Chat: FC = () => {
  const [chats, setChats] = useState<IAllChatWithUser[]>(
    [] as IAllChatWithUser[]
  );
  const [selectChats, setSelectChats] = useState<IAllChatWithUser>(
    {} as IAllChatWithUser
  );
  const [reren, setreren] = useState<boolean>(false);
  useEffect(() => {
    getChat();
    setreren(false);
  }, [reren]);
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
            <ChatSearch setReren={setreren} />
            <div className="all_chat_block_users">
              <ChatRow {...{ chats, selectChats, setSelectChats }} />
            </div>
          </div>

          <MainChat chat={selectChats} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
