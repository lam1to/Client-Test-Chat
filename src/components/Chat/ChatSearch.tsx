import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import st from "../../styles/chat.module.css";
import { IuserChat } from "../../types/IUser";
import { getAllUsers } from "../../http/user.services";
import { useAppSelector } from "../../Hooks/redux";
import { Socket } from "socket.io-client";
import { useOutsideClick } from "outsideclick-react";
import { selectUser } from "../../store/Reducers/UserSlice";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
export interface PropsChatSearch {
  socket: Socket;
  setHidden?: Dispatch<SetStateAction<boolean>>;
}

const ChatSearch: FC<PropsChatSearch> = ({ socket, setHidden }) => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IuserChat[]>();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const [t, i18n] = useTranslation();
  const [nameChat, setNameChat] = useState<string>("");
  const [count, setCount] = useState<string[]>([]);
  useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
  }, [count.length]);
  const SearchUser = users?.filter((oneUser) => {
    return (
      oneUser.name.toLowerCase().includes(search.toLowerCase()) ||
      oneUser.lastName.toLowerCase().includes(search.toLowerCase())
    );
  });
  const createChatF = () => {
    if (count.length > 0) {
      socket.emit("createChat", {
        userWhoCreateId: user.user.id,
        idUsers: [...count],
        name: nameChat,
      });
      setCount([]);
      setIsSearch(false);
      if (setHidden) setHidden(true);
    }
  };
  const handleOutsideClick = () => {
    setIsSearch(false);
    setCount([]);
  };
  const ref = useOutsideClick(handleOutsideClick);
  return (
    <form ref={ref} className={st.block_chat_search_form}>
      <input
        autoComplete="off"
        type="text"
        value={search}
        name="search"
        placeholder={t("chatSearch.searchUsers")}
        className={st.chat_search_input}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => (isSearch ? setIsSearch(false) : setIsSearch(true))}
      />
      <AnimatePresence>
        {isSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={st.block_list_container}
          >
            <div className={st.block_list_user}>
              <div className={st.block_create}>
                <button
                  type="button"
                  onClick={() => createChatF()}
                  className={st.button_create}
                >
                  {count.length == 1 ? (
                    <>{t("chatSearch.createDm")}</>
                  ) : count.length > 1 ? (
                    <>{t("chatSearch.createGm")}</>
                  ) : (
                    <>{t("chatSearch.selectUsers")} </>
                  )}
                </button>
                <div className={st.block_create_counter}>{count.length}</div>
              </div>
              <AnimatePresence>
                {count.length > 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ overflow: "hidden" }}
                  >
                    <input
                      type="text"
                      placeholder={t("chatSearch.inputNameChat")}
                      className={`${st.chat_search_input} ${st.chat_search_input_name_chat}`}
                      value={nameChat}
                      onChange={(e) => setNameChat(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

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
                              })[0] && (
                              <div className={st.selectUser}>
                                {t("chatSearch.selected")}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ChatSearch;
