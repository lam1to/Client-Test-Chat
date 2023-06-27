import React, { FC, useEffect, useState } from "react";
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTR_ROUTE } from "../../utils/const";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import { registration } from "../../http/user.services";
import { Iuser } from "../../types/IUser";

const Registration: FC = () => {
  const [user, setUser] = useState<Iuser>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  } as Iuser);
  const navigate = useNavigate();
  const registrationF = async () => {
    const data = await registration(user);
    console.log("component data = ", data);
    navigate(CHAT_ROUTE);
  };
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
                value={user.name}
                placeholder="Имя"
                className={styles.block_inputLitl}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="text"
                value={user.lastName}
                placeholder="Фамилия"
                className={styles.block_inputLitl}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
            <input
              type="text"
              value={user.email}
              placeholder="Email"
              className={styles.block_input}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="password"
              value={user.password}
              placeholder="Пароль"
              className={styles.block_input}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Link to={""}>
              <div className={`${styles.block_button}`} onClick={registrationF}>
                Зарегистрироваться{" "}
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
