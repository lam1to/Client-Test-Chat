import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTR_ROUTE } from "../../utils/const";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import { registration } from "../../http/user.services";
import { Iuser } from "../../types/IUser";
import { useAppDispatch } from "../../Hooks/redux";
import { UserSlice } from "../../store/Reducers/UserSlice";
import { useTranslation } from "react-i18next";
import { IError } from "../../types/IError";
import { Modal } from "../Modal/Modal";

const Registration: FC = () => {
  const [user, setUser] = useState<Iuser>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  } as Iuser);
  const navigate = useNavigate();
  const { SetUser } = UserSlice.actions;
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<IError>({} as IError);
  const registrationF = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = await registration(user, setError);
    if (data) {
      dispatch(SetUser(data));
      navigate(CHAT_ROUTE);
    }
  };
  useEffect(() => {
    setVisible(true);
  }, [error]);
  const [t] = useTranslation();

  return (
    <div className={styles.block_auth}>
      {Object.keys(error).length > 0 && (
        <Modal
          visible={visible}
          title={`${t("auth.error")}${error.statusCode}`}
          onClose={() => setVisible(false)}
        >
          <div className={styles.auth_error_container}>
            <div className={styles.auth_error_row}>
              {error.message?.map((oneMessage, i) => (
                <div key={i}>{oneMessage}</div>
              ))}
            </div>
            <div className={styles.auth_error_repeat}>
              {t("auth.errorRepeat")}
            </div>
          </div>
        </Modal>
      )}
      <div className="block_auth-container _container">
        <div className={styles.auth_select_varinat}>
          <div className={styles.block_auth_variant_avtor}>
            <Link to={LOGIN_ROUTE}>{t("auth.login1")}</Link>
          </div>
          <div
            className={`${styles.block_auth_variant_avtor}  ${styles._activ_logreg}`}
          >
            <Link to={REGISTR_ROUTE}>{t("auth.registration")}</Link>
          </div>
        </div>
        <div className={styles.block_auth_formR}>
          <form className={styles.block_auth_block_form}>
            <div className={styles.block_auth_fi}>
              <input
                type="text"
                value={user.name}
                placeholder={t("auth.name")}
                className={styles.block_inputLitl}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="text"
                value={user.lastName}
                placeholder={t("auth.lastName")}
                className={styles.block_inputLitl}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
            <input
              type="text"
              value={user.email}
              placeholder={t("auth.email")}
              className={styles.block_input}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="password"
              value={user.password}
              placeholder={t("auth.password")}
              className={styles.block_input}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button
              className={`${styles.block_button}`}
              type="submit"
              onClick={registrationF}
            >
              {t("auth.registration2")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
