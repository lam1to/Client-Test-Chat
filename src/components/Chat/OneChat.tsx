import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { IAllChatWithUser } from "../../types/IChat";
import st from "../../styles/oneChat.module.css";
import dotsImg from "../../public/more.png";
import { Socket } from "socket.io-client";
import { useOutsideClick } from "outsideclick-react";

export interface PropsOneChat {
  oneChat: IAllChatWithUser;
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
  socket: Socket;
  setHidden?: Dispatch<SetStateAction<boolean>>;
}
const OneChat: FC<PropsOneChat> = ({
  oneChat,
  setSelectChats,
  socket,
  setHidden,
}) => {
  const removeF = async () => {
    socket.emit("deleteChat", oneChat.id);
    setIsDropDown(false);
    if (setHidden) setHidden(true);
  };
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const handleOutsideClick = () => {
    setIsDropDown(false);
  };
  const ref = useOutsideClick(handleOutsideClick);
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
        <div
          ref={ref}
          onClick={(e) => {
            isDropDown ? setIsDropDown(false) : setIsDropDown(true);
            e.stopPropagation();
          }}
          className={st.onechat_remove_block}
        >
          <div className={st.oneChat_remove_block_img}>
            <img src={dotsImg} alt="" />
          </div>
          {isDropDown && (
            <div className={st.position}>
              <div
                onClick={() => removeF()}
                className={st.onechat_remove_block_drop_down}
              >
                <ul>
                  <li className={st.onechat_remove_block_drop_down_item}>
                    remove
                  </li>
                </ul>
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
