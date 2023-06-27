import React, { FC, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTR_ROUTE } from "../../utils/const";
import styles from "../../styles/auth.module.css";
import { IuserLogin } from "../../types/IUser";
import { login } from "../../http/user.services";

const Login: FC = () => {
  const [user, setUser] = useState<IuserLogin>({
    email: "",
    password: "",
  } as IuserLogin);
  const navigate = useNavigate();
  const loginF = async () => {
    const data = await login(user);
    console.log("login data = ", data);
    navigate(CHAT_ROUTE);
  };
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
              value={user.email}
              type="text"
              placeholder="Email"
              className={styles.block_input}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="password"
              value={user.password}
              name="Password"
              placeholder="Пароль"
              className={styles.block_input}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Link to={""}>
              <div className={styles.block_button} onClick={loginF}>
                Войти
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;