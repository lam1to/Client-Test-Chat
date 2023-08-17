import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTR_ROUTE } from "../../utils/const";
import styles from "../../styles/auth.module.css";
import { IuserForState, IuserLogin } from "../../types/IUser";
import { login } from "../../http/user.services";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import { UserSlice, selectIsAuth } from "../../store/Reducers/UserSlice";
import { IError } from "../../types/IError";
import { Modal } from "../Modal/Modal";
import { useTranslation } from "react-i18next";
import ModalError from "../Modal/ModalError";

const Login: FC = () => {
  const [user, setUser] = useState<IuserLogin>({
    email: "",
    password: "",
  } as IuserLogin);
  const navigate = useNavigate();

  const isAuth = useAppSelector(selectIsAuth);
  const { SetUser } = UserSlice.actions;
  const dispatch = useAppDispatch();
  const [error, setError] = useState<IError>({} as IError);

  const loginF = async (e: SyntheticEvent) => {
    e.preventDefault();
    const getUser: IuserForState = await login(user, setError);
    if (getUser) {
      dispatch(SetUser(getUser));
      navigate(CHAT_ROUTE);
    }
  };
  useEffect(() => {
    setVisible(true);
  }, [error]);
  const [visible, setVisible] = useState<boolean>(false);
  const [t] = useTranslation();

  return (
    <div className={styles.block_auth}>
      {Object.keys(error).length > 0 && (
        <ModalError visible={visible} error={error} setVisible={setVisible} />
      )}
      <div className="block-auth-container _container">
        <div className={styles.auth_select_varinat}>
          <div
            className={`${styles.block_auth_variant_avtor}  ${styles._activ_logreg}`}
          >
            <Link to={LOGIN_ROUTE}>{t("auth.login1")}</Link>
          </div>
          <div className={styles.block_auth_variant_avtor}>
            <Link to={REGISTR_ROUTE}>{t("auth.registration")}</Link>
          </div>
        </div>
        <div className={styles.block_auth_form}>
          <form className={styles.block_auth_block_form}>
            <input
              name="Email"
              value={user.email}
              type="text"
              placeholder={t("auth.email")}
              className={styles.block_input}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="password"
              value={user.password}
              name="Password"
              placeholder={t("auth.password")}
              className={styles.block_input}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <button
              className={styles.block_button}
              type="submit"
              onClick={loginF}
            >
              {t("auth.login2")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
