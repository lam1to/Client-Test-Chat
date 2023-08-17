import React from "react";
import styles from "../../styles/navbar.module.css";
import { useTranslation } from "react-i18next";

const NavbarSelectLang = () => {
  const [t, i18n] = useTranslation();
  return (
    <select
      className={styles.navbar_menu_dropDown_select}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="ru">Ru</option>
      <option value="en">En</option>
    </select>
  );
};

export default NavbarSelectLang;
