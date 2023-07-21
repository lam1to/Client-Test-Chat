import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IAllChatWithUser, ILeftChatUser, LeftChat } from "../../types/IChat";
import st from "../../styles/oneChat.module.css";
import dotsImg from "../../public/more.png";
import { Socket } from "socket.io-client";
import { useOutsideClick } from "outsideclick-react";
import { useAppSelector } from "../../Hooks/redux";
import { selectUser } from "../../store/Reducers/UserSlice";
import { Position } from "./ChatMessage";
import { useTranslation } from "react-i18next";

export interface PropsOneChat {
  oneChat: IAllChatWithUser;
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
  socket: Socket;
  setHidden?: Dispatch<SetStateAction<boolean>>;
  blackList: string;
  leftIsChat?: boolean;
  editLeftChat: (one: ILeftChatUser, flag: boolean) => void;
}
const OneChat: FC<PropsOneChat> = ({
  oneChat,
  setSelectChats,
  socket,
  setHidden,
  blackList,
  leftIsChat,
  editLeftChat,
}) => {
  const [t, i18n] = useTranslation();
  const [xYPosistion, setXyPosistion] = useState<Position>({ x: 0, y: 0 });
  const removeF = () => {
    socket.emit("deleteChat", oneChat.id);
    setIsDropDown(false);
    if (setHidden) setHidden(true);
  };
  const user = useAppSelector(selectUser);
  const blockUser = () => {
    socket.emit("createBlockUser", {
      idUserWhoBlocked: user.user.id,
      idUserWhoWasBlocked: oneChat.users[0].id,
    });
  };
  const unblockUser = () => {
    socket.emit("removeBlockUser", {
      idUserWhoBlocked: user.user.id,
      idUserWhoWasBlocked: oneChat.users[0].id,
    });
  };
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const handleOutsideClick = () => {
    setIsDropDown(false);
  };
  const ref = useOutsideClick(handleOutsideClick);
  const onVisible = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const positionChange = {
      x: e.pageX,
      y: e.pageY,
    };
    setXyPosistion(positionChange);
    isDropDown ? setIsDropDown(false) : setIsDropDown(true);
  };
  const newLeftUserInChat = (newLeftUserInChatOne: ILeftChatUser) => {
    if (newLeftUserInChatOne.userId !== user.user.id && !leftIsChat)
      editLeftChat(newLeftUserInChatOne, true);
  };
  const deleteLeftUserInChat = (newLeftUserInChatOne: ILeftChatUser) => {
    if (newLeftUserInChatOne.userId !== user.user.id && !leftIsChat)
      editLeftChat(newLeftUserInChatOne, false);
  };
  useEffect(() => {
    socket.on(`newLeftUserInChat${oneChat.id}`, newLeftUserInChat);
    socket.on(`deleteLeftUserInChat${oneChat.id}`, deleteLeftUserInChat);
    return () => {
      socket.off(`newLeftUserInChat${oneChat.id}`, newLeftUserInChat);
      socket.off(`deleteLeftUserInChat${oneChat.id}`, deleteLeftUserInChat);
    };
  }, [leftIsChat]);
  const left = () => {
    socket.emit("createLeftChat", {
      idUsers: user.user.id,
      idChat: oneChat.id,
    });
    console.log("left press");
  };
  const join = () => {
    socket.emit("removeLeftChat", {
      idUsers: user.user.id,
      idChat: oneChat.id,
    });
    console.log("join press");
  };
  return (
    <div
      onClick={() => {
        if (setHidden) setHidden(true);
        setSelectChats(oneChat);
      }}
      className={st.onechat_block}
    >
      <div className={st.onechat_block_img}>
        {oneChat?.users && <img src={`${oneChat.users[0].avatarPath}`} />}
      </div>
      <div className={st.onechat_block_name_remove}>
        <div className={st.onechat_block_name}>
          {oneChat.users?.map((one, i) => (
            <div className={st.onechat_block_name_block} key={one.id}>
              {oneChat.users.length == 1
                ? one.name + " " + one.lastName
                : oneChat.users.length - 1 !== i
                ? one.name + ",  "
                : one.name}
            </div>
          ))}
        </div>
        <div ref={ref} onClick={onVisible} className={st.onechat_remove_block}>
          <div className={st.oneChat_remove_block_img}>
            <img src={dotsImg} alt="" />
          </div>
          {isDropDown && (
            <div className={st.position}>
              <div
                style={{ top: xYPosistion.y, left: xYPosistion.x - 100 }}
                className={st.onechat_remove_block_drop_down}
              >
                {oneChat.type === "DM" ? (
                  <ul className={st.onechat_remove_block_drop_down_row}>
                    {blackList === "blocked" ||
                    blackList === "blockedBlocker" ? (
                      <li
                        onClick={unblockUser}
                        className={st.onechat_remove_block_drop_down_item}
                      >
                        {t("oneChat.unblock")}
                      </li>
                    ) : (
                      <li
                        onClick={blockUser}
                        className={st.onechat_remove_block_drop_down_item}
                      >
                        {t("oneChat.block")}
                      </li>
                    )}
                  </ul>
                ) : (
                  <ul className={st.onechat_remove_block_drop_down_row}>
                    {leftIsChat ? (
                      <li
                        onClick={join}
                        className={st.onechat_remove_block_drop_down_item}
                      >
                        {t("oneChat.join")}
                      </li>
                    ) : (
                      <li
                        onClick={left}
                        className={st.onechat_remove_block_drop_down_item}
                      >
                        {t("oneChat.left")}
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div>{message && message.content}</div> */}
    </div>
  );
};

export default OneChat;
