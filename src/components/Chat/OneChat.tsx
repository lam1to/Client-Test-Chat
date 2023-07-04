import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { IAllChatWithUser } from "../../types/IChat";
import st from "../../styles/oneChat.module.css";
import dotsImg from "../../public/more.png";
import { remove } from "../../http/chat.services";

export interface PropsOneChat {
  oneChat: IAllChatWithUser;
  setSelectChats: Dispatch<SetStateAction<IAllChatWithUser>>;
}
const OneChat: FC<PropsOneChat> = ({ oneChat, setSelectChats }) => {
  //const { message } = useAppSelector((state) => state.messageReducer);
  //console.log("message in state = ", message);

  const removeF = async () => {
    await remove(oneChat.id);
  };

  return (
    <div
      onClick={() => setSelectChats(oneChat)}
      className={st.onechat_container}
    >
      <div className={st.onechat}>
        <div className={st.onechat_block}>
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
            <div className={st.onechat_remove_block}>
              <div className={st.oneChat_remove_block_img}>
                <img src={dotsImg} alt="" />
              </div>
              <div className={st.position}>
                <div
                  onClick={() => removeF()}
                  className={st.onechat_remove_block_drop_down}
                >
                  remove
                </div>
              </div>
            </div>
          </div>
          {/* <div>{message && message.content}</div> */}
        </div>
      </div>
    </div>
  );
};

export default OneChat;
