import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import st from "../../styles/chat.module.css";
import { IuserChat } from "../../types/IUser";
import { getAllUsers } from "../../http/user.services";
import { createChat } from "../../http/chat.services";
import { useAppSelector } from "../../Hooks/redux";
export interface PropsChatSearch {
  setReren: Dispatch<SetStateAction<boolean>>;
}

const ChatSearch: FC<PropsChatSearch> = ({ setReren }) => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IuserChat[]>();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
  }, []);
  const SearchUser = users?.filter((oneUser) => {
    return (
      oneUser.name.toLowerCase().includes(search.toLowerCase()) ||
      oneUser.lastName.toLowerCase().includes(search.toLowerCase())
    );
  });
  const createChatF = () => {
    const chat = createChat([...count, user.user.id]);
    setIsSearch(false);
    setReren(true);
  };
  const [style, setStyle] = useState<string>(st.onechat_block);
  const [count, setCount] = useState<string[]>([]);
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
        onClick={() => (isSearch ? setIsSearch(false) : setIsSearch(true))}
      />
      <div
        className={`${
          isSearch === true ? st.block_list_user_true : st.block_list_user_false
        } ${st.block_list_user}`}
      >
        <div className={st.block_create}>
          <button
            type="button"
            onClick={() => createChatF()}
            className={st.button_create}
          >
            {count.length == 1 ? (
              <>Создать DM</>
            ) : count.length > 1 ? (
              <>Создать GroupM</>
            ) : (
              <>Выберете users </>
            )}
          </button>
          <div className={st.block_create_counter}>{count.length}</div>
        </div>
        <ul className={st.list_user}>
          {SearchUser?.map((oneUser, i) => {
            let flag: boolean = false;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    oneUser.id ===
                    count.filter((one) => {
                      return one === oneUser.id;
                    })[0]
                      ? setCount((count) =>
                          count.filter((oneCount) => {
                            return oneCount !== oneUser.id;
                          })
                        )
                      : setCount((count) => [...count, oneUser.id]);
                    flag = true;
                  }}
                  className={st.search_button}
                >
                  <div
                    className={`${
                      oneUser.id ===
                      count.filter((one) => {
                        return one === oneUser.id;
                      })[0]
                        ? st.onechat_block_select
                        : st.onechat_block
                    } ${st.onechat_block}`}
                  >
                    <div className={st.oneuser_block_img}>
                      <img src={oneUser.avatarPath} alt="" />
                    </div>
                    <div className={st.block_user}>
                      <div className={st.oneuser_block_name}>
                        {oneUser.name + " " + oneUser.lastName}
                      </div>
                      {oneUser.id ===
                        count.filter((one) => {
                          return one === oneUser.id;
                        })[0] && <div className={st.selectUser}>Выбран</div>}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </form>
  );
};

export default ChatSearch;
