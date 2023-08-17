import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Modal } from "./Modal";
import styles from "../../styles/navbar.module.css";
import { useAppSelector } from "../../Hooks/redux";
import { selectUser } from "../../store/Reducers/UserSlice";
import { useTranslation } from "react-i18next";
import { useFuncNavbar } from "../../Hooks/useFuncNavbar";
import { useFuncInput } from "../../Hooks/useFuncInput";

export interface IModalUserInfoProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
export interface IFi {
  name: string;
  lastName: string;
}

const ModalUserInfo: FC<IModalUserInfoProps> = ({ visible, setVisible }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newFi, setNewFi] = useState<IFi>({} as IFi);
  const refInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const startUpload = () => {
    refInput.current.click();
  };
  const user = useAppSelector(selectUser);
  const funcInput = useFuncInput();
  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("зашли");
      setNewAvatar(e.target.files[0]);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const [newAvatar, setNewAvatar] = useState<File>({} as File);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  useEffect(() => {
    setAvatarUrl(user.user.avatar_path);
  }, []);

  const [t] = useTranslation();
  const funcNavbar = useFuncNavbar();
  const [changeDataFlag, setChangeDataFlag] = useState<boolean>(false);

  const save = async () => {
    if (user.user.avatar_path !== avatarUrl && newAvatar.name) {
      console.log("меняем аватар");
      await funcNavbar.uploadNewAvatar(newAvatar, setNewAvatar);
    }
    if (
      newFi.lastName !== user.user.lastName ||
      newFi.name !== user.user.name
    ) {
      console.log("меняем foi");
      await funcNavbar.editFi(newFi, setNewFi);
    }
  };
  return (
    <div className={styles.navbar_user_info}>
      <Modal
        visible={visible}
        title={`${t("navbar.infoUser")} ${user.user.name}`}
        onClose={() => {
          setChangeDataFlag(false);
          setNewFi({} as IFi);
          setNewAvatar({} as File);
          setAvatarUrl(user.user.avatar_path);
          setVisible(false);
        }}
      >
        <div className={styles.navbar_user_info_container}>
          <div className={styles.navbar_user_info_container_block_info}>
            <div className={styles.navbar_user_info_avatar}>
              <img src={avatarUrl} alt="" />

              {changeDataFlag && (
                <div
                  className={styles.navbar_user_info_avatar_change_block}
                  onClick={startUpload}
                >
                  <input
                    className={styles.navbar_user_info_avatar_change_input}
                    ref={refInput}
                    type="file"
                    name=""
                    id=""
                    multiple={false}
                    accept="image/*"
                    onChange={onChangeInputFile}
                  />
                  <div>{t("navbar.uploadAvatar")}</div>
                </div>
              )}
            </div>
            <div className={styles.navbar_user_info_fi}>
              {changeDataFlag ? (
                <input
                  className={styles.navbar_user_info_change_fi}
                  placeholder={user.user.name}
                  onChange={(e) => {
                    if (e.target.value === "")
                      setNewFi((newFi) => {
                        return { ...newFi, name: user.user.name };
                      });
                    else
                      setNewFi((newFi) => {
                        return { ...newFi, name: e.target.value };
                      });
                  }}
                ></input>
              ) : (
                <div className={styles.navbar_user_info_fi_item}>
                  {user.user.name}
                </div>
              )}
              {changeDataFlag ? (
                <input
                  className={styles.navbar_user_info_change_fi}
                  placeholder={user.user.lastName}
                  onChange={(e) => {
                    if (e.target.value === "")
                      setNewFi((newFi) => {
                        return { ...newFi, lastName: user.user.lastName };
                      });
                    else
                      setNewFi((newFi) => {
                        return { ...newFi, lastName: e.target.value };
                      });
                  }}
                ></input>
              ) : (
                <div className={styles.navbar_user_info_fi_item}>
                  {user.user.lastName}
                </div>
              )}
            </div>
          </div>
          <div className={styles.navbar_user_info_block_change_data}>
            <div className={styles.navbar_user_info_block_change_button_block}>
              <button
                className={styles.navbar_user_info_block_change_button}
                onClick={() => {
                  changeDataFlag && save();
                  setChangeDataFlag(changeDataFlag ? false : true);
                  setNewFi((newFi) => {
                    newFi.name = user.user.name;
                    newFi.lastName = user.user.lastName;
                    return newFi;
                  });
                }}
              >
                {changeDataFlag ? (
                  <div>{t("navbar.saveChange")}</div>
                ) : (
                  <div> {t("navbar.changeData")}</div>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalUserInfo;
