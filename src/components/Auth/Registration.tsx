import React, { FC, useState } from "react";
import { LOGIN_ROUTE, REGISTR_ROUTE } from "../../utils/const";
import { Link } from "react-router-dom";
import styles from "../../styles/auth.module.css";

const Registration: FC = () => {
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.block_auth}>
      <div className="block_auth-container _container">
        <div className={styles.auth_select_varinat}>
          <div className={styles.block_auth_variant_avtor}>
            <Link to={LOGIN_ROUTE}>Войти</Link>
          </div>
          <div
            className={`${styles.block_auth_variant_avtor}  ${styles._activ_logreg}`}
          >
            <Link to={REGISTR_ROUTE}>Регистрация</Link>
          </div>
        </div>
        <div className={styles.block_auth_formR}>
          <form className={styles.block_auth_block_form}>
            <div className={styles.block_auth_fi}>
              <input
                type="text"
                value={userName}
                placeholder="Имя"
                className={styles.block_inputLitl}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                placeholder="Фамилия"
                className={styles.block_inputLitl}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="text"
              value={email}
              placeholder="Email"
              className={styles.block_input}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              value={phone}
              placeholder="Номер телефона"
              className={styles.block_input}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Пароль"
              className={styles.block_input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to={""}>
              <div className={`${styles.block_button}`}>Зарегистрироваться</div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
