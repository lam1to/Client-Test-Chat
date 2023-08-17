import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "../../utils/const";
import { useAppSelector } from "../../Hooks/redux";
import { selectIsAuth, selectUser } from "../../store/Reducers/UserSlice";
import { useTranslation } from "react-i18next";
import { useFuncNavbar } from "../../Hooks/useFuncNavbar";
import NavBarMenu from "./NavBarMenu";
import NavbarSelectLang from "./NavbarSelectLang";

const NavBar: FC = () => {
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuth);
  const [t] = useTranslation();

  return (
    <div className={`${styles.navbar} navbar`}>
      <div className={`${styles.navbar_container} _container`}>
        <div className={styles.navbar_title}>
          <button
            onClick={() => navigate(CHAT_ROUTE)}
            className={styles.link_button}
          >
            TestChat
          </button>
        </div>

        {!isAuth && <NavbarSelectLang />}

        {isAuth && (
          <div className={styles.navbar_name}>
            {t("navbar.welcom") + user.user.name}
          </div>
        )}
        {isAuth && <NavBarMenu />}
      </div>
    </div>
  );
};

export default NavBar;
