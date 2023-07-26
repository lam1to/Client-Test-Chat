import React, { FC } from "react";
import { IuserChat } from "../../types/IUser";
import st from "../../styles/oneUser.module.css";
interface IPropsOneUser {
  user: IuserChat;
}

const OneUser: FC<IPropsOneUser> = ({ user }) => {
  return (
    <div className={st.one_user_block}>
      <div className={st.one_user_avatar_block}>
        <img src={user.avatarPath} alt="" />
      </div>
      <div className={st.one_user_name}>{user.name + " " + user.lastName}</div>
    </div>
  );
};

export default OneUser;
