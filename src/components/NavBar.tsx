import React, { FC, useState } from "react";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "../utils/const";
import { useAppDispatch, useAppSelector } from "../Hooks/redux";
import { UserSlice } from "../store/Reducers/UserSlice";
import { IuserForState } from "../types/IUser";
import { useTranslation } from "react-i18next";
import navbarMenuImg from "../public/menu.png";
import navbarCloseMenuImg from "../public/close.png";
import { useOutsideClick } from "outsideclick-react";
const NavBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.userReducer);
  const { SetIsAuth, SetUserN } = UserSlice.actions;
  const [t, i18n] = useTranslation();
  const [hidden, setHidden] = useState<boolean>(true);
  const exit = () => {
    dispatch(SetUserN({} as IuserForState));
    localStorage.removeItem("token");
  };
  const handleOutsideClick = () => {
    setHidden(true);
  };
  const ref = useOutsideClick(handleOutsideClick);
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
        <div className={styles.navbar_name}>
          {t("navbar.welcom") + user.user.name}
        </div>
        <div className={styles.navbar_menu}>
          <div className={styles.navbar_menu_block_img}>
            <img
              onClick={() => setHidden(hidden ? false : true)}
              src={navbarMenuImg}
            />
          </div>
          <div
            ref={ref}
            className={`${styles.navbar_menu_block_dropDown} ${
              hidden
                ? styles.navbar_menu_block_dropDown_hidden
                : styles.navbar_menu_block_dropDown_activ
            }`}
          >
            <div className={styles.navbar_menu_block_close_block}>
              <div className={styles.navbar_name_dropDown}>
                {user.user.name}
              </div>
              <img
                onClick={() => setHidden(true)}
                src={navbarCloseMenuImg}
                alt=""
              />
            </div>

            <ul className={styles.navbar_menu_dropDown}>
              <li className={styles.navbar_menu_item}>
                <select
                  className={styles.navbar_menu_dropDown_select}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  <option value="ru">Ru</option>
                  <option value="en">En</option>
                </select>
              </li>
              <li className={styles.navbar_menu_item}>
                <button
                  onClick={() => exit()}
                  className={`${styles.link_button} ${styles.navbar_menu_exit_button}`}
                >
                  {t("navbar.exit")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
