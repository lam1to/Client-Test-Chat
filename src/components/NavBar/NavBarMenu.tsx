import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";

import styles from "../../styles/navbar.module.css";
import { useFuncNavbar } from "../../Hooks/useFuncNavbar";
import { useOutsideClick } from "outsideclick-react";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import { UserSlice, selectUser } from "../../store/Reducers/UserSlice";
import { IuserForState } from "../../types/IUser";
import navbarMenuImg from "../../public/menu.png";
import navbarCloseMenuImg from "../../public/close.png";
import { useTranslation } from "react-i18next";
import { Modal } from "../Modal/Modal";
import ModalUserInfo from "../Modal/ModalUserInfo";
import NavbarSelectLang from "./NavbarSelectLang";

export interface INavBarMenuProps {}

const NavBarMenu: FC<INavBarMenuProps> = ({}) => {
  const funcNavbar = useFuncNavbar();

  const handleOutsideClick = () => {
    setHidden(true);
  };
  const dispatch = useAppDispatch();
  const ref = useOutsideClick(handleOutsideClick);
  const { SetUserN } = UserSlice.actions;
  const exit = () => {
    dispatch(SetUserN({} as IuserForState));
    localStorage.removeItem("token");
  };
  const [visible, setVisible] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const [t, i18n] = useTranslation();
  const [hidden, setHidden] = useState<boolean>(true);

  return (
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
          <div
            onClick={() => {
              setVisible(visible ? false : true);
              setHidden(true);
            }}
            className={styles.navbar_name_dropDown}
          >
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
            <NavbarSelectLang />
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
      <ModalUserInfo visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default NavBarMenu;
