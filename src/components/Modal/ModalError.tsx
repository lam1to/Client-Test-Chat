import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Modal } from "./Modal";
import { useTranslation } from "react-i18next";
import { IError } from "../../types/IError";
import styles from "../../styles/auth.module.css";

export interface IModalErrorProps {
  visible: boolean;
  error: IError;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const ModalError: FC<IModalErrorProps> = ({
  visible = false,
  error,
  setVisible,
}) => {
  useEffect(() => {});
  const [t] = useTranslation();

  return (
    <Modal
      visible={visible}
      title={`${t("auth.error")}${error.statusCode}`}
      onClose={() => setVisible(false)}
    >
      <div className={styles.auth_error_container}>
        <div className={styles.auth_error_block_row}>
          <div className={styles.auth_error_row}>
            {error.message?.map((oneMessage, i) => (
              <div className={styles.auth_error_item} key={i}>
                {oneMessage}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.auth_error_repeat}>{t("auth.errorRepeat")}</div>
      </div>
    </Modal>
  );
};

export default ModalError;
