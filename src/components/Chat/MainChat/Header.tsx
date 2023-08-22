import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import st from "../../../styles/mainChat.module.css";
import { IChatWithUser, ILeftChatUser } from "../../../types/IChat";
import searchPngg from "../../../public/search_symbol.png";
import { useOutsideClick } from "outsideclick-react";
import { useTranslation } from "react-i18next";
import mainChatHeaderDotsImg from "../../../public/dots.png";
import { Modal } from "../../Modal/Modal";
import { useAppSelector } from "../../../Hooks/redux";
import { selectUser } from "../../../store/Reducers/UserSlice";
import { Socket } from "socket.io-client";
import OneUser from "../OneUser";
import { useFuncChat } from "../../../Hooks/useFuncChat";
import { AnimatePresence, motion } from "framer-motion";
import { IMessage } from "../../../types/IMessage";

interface PropsMainChatHeader {
  chat: IChatWithUser;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  blackList: string;
  socket: Socket;
  leftIsChat?: boolean;
  editLeftChat: (oneLeftChat: ILeftChatUser, flag: boolean) => void;
}
const Header: FC<PropsMainChatHeader> = ({
  chat,
  filter,
  setFilter,
  blackList,
  socket,
  leftIsChat,
  editLeftChat,
}) => {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const handleOutsideClick = () => {
    setIsFilter(false);
  };
  const [t, i18n] = useTranslation();
  const ref = useOutsideClick(handleOutsideClick);
  const [visible, setVisible] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const funcChat = useFuncChat();
  const newLeftUserInChat = (newLeftUserInChatOne: ILeftChatUser) => {
    if (newLeftUserInChatOne.userId !== user.user.id && !leftIsChat)
      editLeftChat(newLeftUserInChatOne, true);
  };
  const deleteLeftUserInChat = (newLeftUserInChatOne: ILeftChatUser) => {
    if (newLeftUserInChatOne.userId !== user.user.id && !leftIsChat)
      editLeftChat(newLeftUserInChatOne, false);
  };
  useEffect(() => {
    socket.on(`newLeftUserInChat${chat.id}`, newLeftUserInChat);
    socket.on(`deleteLeftUserInChat${chat.id}`, deleteLeftUserInChat);
    return () => {
      socket.off(`newLeftUserInChat${chat.id}`, newLeftUserInChat);
      socket.off(`deleteLeftUserInChat${chat.id}`, deleteLeftUserInChat);
    };
  }, [leftIsChat]);
  return (
    <div className={st.main_chat_header}>
      <div className={st.main_chat_header_name}>
        <div className={st.main_chat_header_name_block}>
          {chat.type == "DM" ? (
            <div>{chat.users[0].name}</div>
          ) : (
            <div>{chat.name}</div>
          )}
        </div>
      </div>
      <div ref={ref} className={st.main_chat_header_search}>
        <div
          onClick={() => {
            isFilter ? setIsFilter(false) : setIsFilter(true);
          }}
          className={st.main_chat_header_search_block}
        >
          <img className={st.main_chat_header_search_img} src={searchPngg} />
        </div>
        <AnimatePresence>
          {isFilter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={st.main_chat_header_search_block_input}
            >
              <input
                placeholder={t("mainChatHeader.searchMessage")}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={st.main_chat_header_search_input}
                type="text"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={st.main_chat_header_menu_block}>
        <img
          onClick={() => setVisible(visible ? false : true)}
          src={mainChatHeaderDotsImg}
          alt=""
        />
      </div>
      <div className={st.main_chat_header_dropDown}>
        <Modal
          onClose={() => setVisible(false)}
          title={`${t("mainChatHeader.infoChat")} ${chat.name}`}
          visible={visible}
        >
          <div className={st.main_chat_header_row_func}>
            <div className={st.main_chat_header_setting}>
              {t("mainChatHeader.setting")}
            </div>
            {chat.type === "DM" ? (
              <ul className={st.func_block_drop_down_row}>
                {blackList === "blocked" || blackList === "blockedBlocker" ? (
                  <li
                    onClick={() => funcChat.unblockUser(socket, chat)}
                    className={st.func_block_drop_down_item}
                  >
                    {t("mainChatHeader.unblock")}
                  </li>
                ) : (
                  <li
                    onClick={() => funcChat.blockUser(socket, chat)}
                    className={st.func_block_drop_down_item}
                  >
                    {t("mainChatHeader.block")}
                  </li>
                )}
              </ul>
            ) : (
              <ul className={st.func_block_drop_down_row}>
                {chat.userWhoCreateId === user.user.id && (
                  <li
                    onClick={() => funcChat.removeF(socket, chat)}
                    className={st.func_block_drop_down_item}
                  >
                    {t("mainChatHeader.remove")}
                  </li>
                )}

                {leftIsChat ? (
                  <li
                    onClick={() => funcChat.join(socket, chat)}
                    className={st.func_block_drop_down_item}
                  >
                    {t("mainChatHeader.join")}
                  </li>
                ) : (
                  <li
                    onClick={() => funcChat.left(socket, chat)}
                    className={st.func_block_drop_down_item}
                  >
                    {t("mainChatHeader.left")}
                  </li>
                )}
              </ul>
            )}
          </div>
          <div>
            {chat.type == "DM" ? (
              <div></div>
            ) : (
              <div>
                <div>
                  {t("mainChatHeader.listUsers") +
                    "(" +
                    chat.users.length +
                    "):"}
                </div>
                {chat.users.map((one, i) => (
                  <OneUser key={i} user={one} />
                ))}
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
