import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTR_ROUTE } from "../../utils/const";
import styles from "../../styles/auth.module.css";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.block_auth}>
      <div className="block-auth-container _container">
        <div className={styles.auth_select_varinat}>
          <div
            className={`${styles.block_auth_variant_avtor}  ${styles._activ_logreg}`}
          >
            <Link to={LOGIN_ROUTE}>Войти</Link>
          </div>
          <div className={styles.block_auth_variant_avtor}>
            <Link to={REGISTR_ROUTE}>Регистрация</Link>
          </div>
        </div>
        <div className={styles.block_auth_form}>
          <form className={styles.block_auth_block_form}>
            <input
              name="Username"
              value={email}
              type="text"
              placeholder="Email"
              className={styles.block_input}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              name="Password"
              placeholder="Пароль"
              className={styles.block_input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to={""}>
              <div className={styles.block_button}>Войти</div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
