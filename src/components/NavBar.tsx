import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "../utils/const";
import { useAppDispatch, useAppSelector } from "../Hooks/redux";
import {
  UserSlice,
  selectIsAuth,
  selectUser,
} from "../store/Reducers/UserSlice";
import { IuserForState } from "../types/IUser";
import { useTranslation } from "react-i18next";
import navbarMenuImg from "../public/menu.png";
import navbarCloseMenuImg from "../public/close.png";
import { useOutsideClick } from "outsideclick-react";
import { Modal } from "./Modal/Modal";
import { useFuncNavbar } from "../Hooks/useFuncNavbar";

const NavBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuth);
  const { SetIsAuth, SetUserN } = UserSlice.actions;
  const [t, i18n] = useTranslation();
  const [hidden, setHidden] = useState<boolean>(true);
  const exit = () => {
    dispatch(SetUserN({} as IuserForState));
    localStorage.removeItem("token");
  };
  const handleOutsideClick = () => {
    setHidden(true);
  };
  const startUpload = () => {
    refInput.current.click();
  };
  const refInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const ref = useOutsideClick(handleOutsideClick);
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<File>({} as File);
  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatar(e.target.files[0]);
    }
  };
  const funcNavbar = useFuncNavbar();
  console.log("new avatar = ", newAvatar);
  // useEffect(() => {
  //   console.log("загружаем");
  //   funcNavbar.uploadNewAvatar(newAvatar, setIsLoading);
  // }, [newAvatar]);
  console.log("asdasd", Object.keys(newAvatar).length !== 0);
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

        <select
          className={styles.navbar_menu_dropDown_select}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <option value="ru">Ru</option>
          <option value="en">En</option>
        </select>

        {isAuth && (
          <div className={styles.navbar_name}>
            {t("navbar.welcom") + user.user.name}
          </div>
        )}
        {isAuth && (
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
                  <select
                    className={styles.navbar_menu_dropDown_select}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                  >
                    <option value="ru">Ru</option>
                    <option value="en">En</option>
                  </select>
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
            <div className={styles.navbar_user_info}>
              <Modal
                visible={visible}
                title={`${t("navbar.infoUser")} ${user.user.name}`}
                onClose={() => setVisible(false)}
              >
                <div className={styles.navbar_user_info_container}>
                  <div className={styles.navbar_user_info_container_block_info}>
                    <div className={styles.navbar_user_info_avatar}>
                      {isLoading ? (
                        <div>грузит</div>
                      ) : (
                        <img src={user.user.avatar_path} alt="" />
                      )}

                      <div
                        className={styles.navbar_user_info_avatar_change_block}
                        onClick={startUpload}
                      >
                        <input
                          className={
                            styles.navbar_user_info_avatar_change_input
                          }
                          ref={refInput}
                          type="file"
                          name=""
                          id=""
                          multiple={false}
                          accept="image/*"
                          onChange={onChangeInputFile}
                        />
                        <div>сменить</div>
                      </div>
                      {/* {newAvatar && Object.keys(newAvatar).length !== 0 && (
                        <div>загрузить</div>
                      )} */}
                    </div>
                    <div className={styles.navbar_user_info_fi}>
                      {user.user.name + " " + user.user.lastName}
                    </div>
                  </div>
                  <div className={styles.navbar_user_info_block_change_data}>
                    {newAvatar && newAvatar.name && (
                      <div
                        className={styles.navbar_user_info_block_change_avatar}
                      >
                        <button
                          className={
                            styles.navbar_user_info_block_change_data_button_uplod_avatar
                          }
                          onClick={() =>
                            funcNavbar.uploadNewAvatar(
                              newAvatar,
                              setNewAvatar,
                              setIsLoading
                            )
                          }
                        >
                          {t("navbar.uploadAvatar")}
                        </button>
                        <div
                          className={
                            styles.navbar_user_info_block_change_data_name_file
                          }
                        >
                          {" "}
                          {newAvatar.name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
