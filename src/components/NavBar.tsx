import React, { FC } from "react";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "../utils/const";
import { useAppDispatch, useAppSelector } from "../Hooks/redux";
import { UserSlice } from "../store/Reducers/UserSlice";
import { IuserForState } from "../types/IUser";
const NavBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.userReducer);
  const { SetIsAuth, SetUserN } = UserSlice.actions;
  const exit = () => {
    dispatch(SetUserN({} as IuserForState));
    localStorage.removeItem("token");
  };
  return (
    <div className={styles.navbar}>
      <div className={`${styles.navbar_container} _container`}>
        <div className={styles.navbar_title}>
          <button
            onClick={() => navigate(CHAT_ROUTE)}
            className={styles.link_button}
          >
            TestChat
          </button>
        </div>
        {isAuth && (
          <div className={styles.navbar_block_name_exit}>
            <div className={styles.navbar_name}>
              {"Welcome back " + user.user.name}
            </div>
            <div className={styles.navbar_exit}>
              <button onClick={() => exit()} className={styles.link_button}>
                Выход
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
