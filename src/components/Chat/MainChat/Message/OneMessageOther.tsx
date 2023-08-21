import React, { Dispatch, FC, SetStateAction } from "react";
import st from "../../../../styles/message.module.css";
import { IMessage } from "../../../../types/IMessage";
import { Socket } from "socket.io-client";
import { IuserChat } from "../../../../types/IUser";
import { useFuncMessage } from "../../../../Hooks/useFuncMessage";
import { useDataMessage } from "../../../../Hooks/useDataMessage";
import OneMessageWithImg from "./OneMessageWithImg";
import { useTranslation } from "react-i18next";
import BlockMessageWasAnswered from "./BlockMessageWasAnswered";

export interface IPropsOneMessageOther {
  message: IMessage;
  setOverflow: Dispatch<SetStateAction<string>>;
  socket: Socket;
  userWho: IuserChat;
  setReplyMessage: Dispatch<SetStateAction<IMessage>>;
  contentRef: React.MutableRefObject<HTMLInputElement>;
}

export const OneMessageOther: FC<IPropsOneMessageOther> = ({
  message,
  socket,
  setOverflow,
  userWho,
  setReplyMessage,
  contentRef,
}) => {
  const funcMessage = useFuncMessage();
  const dataMessage = useDataMessage(setOverflow);
  const [t, i18n] = useTranslation();
  return (
    <div className={st.message_block_other}>
      <div className={st.message_container}>
        {userWho && <div className={st.message_who_send}>{userWho.name}</div>}
        <div
          onContextMenu={(e) =>
            funcMessage.onVisible(
              e,
              setOverflow,
              dataMessage.setXyPosistion,
              dataMessage.dropDown,
              dataMessage.setDropDown
            )
          }
          ref={dataMessage.ref}
          onClick={(e) => {
            funcMessage.onVisible(
              e,
              setOverflow,
              dataMessage.setXyPosistion,
              dataMessage.dropDown,
              dataMessage.setDropDown
            );
          }}
          className={st.message_content_other}
        >
          {message.messageWasAnswered &&
            Object.keys(message.messageWasAnswered).length !== 0 && (
              <BlockMessageWasAnswered message={message.messageWasAnswered} />
            )}
          {message.contentImg &&
            Object.keys(message.contentImg).length !== 0 && (
              <OneMessageWithImg contentImg={message.contentImg} />
            )}

          <div>{message.content}</div>
          <div className={st.message_content_time}>
            {funcMessage.getTimeMessage(message)}
          </div>
          {dataMessage.dropDown && (
            <div
              style={{
                top: dataMessage.xYPosistion.y,
                left: dataMessage.xYPosistion.x,
              }}
              className={st.message_block_dropdown}
            >
              <ul className={st.message_block_dropdown_row}>
                <li
                  onClick={(e) =>
                    funcMessage.replyMessage(
                      setOverflow,
                      contentRef,
                      message,
                      setReplyMessage
                    )
                  }
                  className={st.message_block_dropdown_item}
                >
                  {t("mainChatContent.replyMessage")}
                </li>
                <li
                  onClick={(e) =>
                    funcMessage.deleteF(
                      e,
                      setOverflow,
                      dataMessage.setDropDown,
                      message,
                      socket
                    )
                  }
                  className={st.message_block_dropdown_item}
                >
                  {t("mainChatContent.deleteMessage")}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
