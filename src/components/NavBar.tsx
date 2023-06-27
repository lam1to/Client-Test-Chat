import React, { FC } from "react";
import styles from "../styles/navbar.module.css";
const NavBar: FC = () => {
  return (
    <div>
      <div className={styles.navbar}>
        <div className={`${styles.navbar_container} _container`}>
          <div className={styles.navbar_title}>TestChat</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
