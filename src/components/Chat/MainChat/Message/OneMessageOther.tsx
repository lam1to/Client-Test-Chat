import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import st from "../../../../styles/message.module.css";
import { IMessage } from "../../../../types/IMessage";
import { Socket } from "socket.io-client";
import { IuserChat } from "../../../../types/IUser";
import { useFuncMessage } from "../../../../Hooks/useFuncMessage";
import { useDataMessage } from "../../../../Hooks/useDataMessage";
import OneMessageWithImg from "./OneMessageWithImg";
import { useTranslation } from "react-i18next";
import BlockMessageWasAnswered from "./BlockMessageWasAnswered";
import OneMessageForwardBlock from "./OneMessageForwardBlock";

export interface IPropsOneMessageOther {
  message: IMessage;
  setOverflow: Dispatch<SetStateAction<string>>;
  socket: Socket;
  userWho: IuserChat;
  setReplyMessage: Dispatch<SetStateAction<IMessage>>;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  setSelectForwardMessage: Dispatch<SetStateAction<IMessage[]>>;
  selectForwardMessage: IMessage[];
}

export const OneMessageOther: FC<IPropsOneMessageOther> = ({
  message,
  socket,
  setOverflow,
  userWho,
  setReplyMessage,
  contentRef,
  setSelectForwardMessage,
  selectForwardMessage,
}) => {
  const funcMessage = useFuncMessage();
  const dataMessage = useDataMessage(setOverflow);
  const [t, i18n] = useTranslation();
  const [isSelect, setIsSelect] = useState<boolean>(false);
  useEffect(() => {
    if (Object.keys(selectForwardMessage).length == 0) {
      setIsSelect(false);
    }
  }, [selectForwardMessage]);
  return (
    <div className={st.message_block_other}>
      <div className={st.message_container}>
        {userWho && <div className={st.message_who_send}>{userWho.name}</div>}
        <div
          onContextMenu={(e) => {
            Object.keys(selectForwardMessage).length !== 0
              ? funcMessage.selectForward(
                  setSelectForwardMessage,
                  selectForwardMessage,
                  message,
                  setOverflow,
                  setIsSelect
                )
              : funcMessage.onVisible(
                  e,
                  setOverflow,
                  dataMessage.setXyPosistion,
                  dataMessage.dropDown,
                  dataMessage.setDropDown
                );
          }}
          ref={dataMessage.ref}
          onClick={(e) => {
            Object.keys(selectForwardMessage).length !== 0
              ? funcMessage.selectForward(
                  setSelectForwardMessage,
                  selectForwardMessage,
                  message,
                  setOverflow,
                  setIsSelect
                )
              : funcMessage.onVisible(
                  e,
                  setOverflow,
                  dataMessage.setXyPosistion,
                  dataMessage.dropDown,
                  dataMessage.setDropDown
                );
          }}
          className={`${st.message_content_other} ${
            Object.keys(selectForwardMessage).length !== 0 &&
            isSelect &&
            st.message_content_other_activ
          }`}
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

          {message.forwardMessages &&
            Object.keys(message.forwardMessages).length !== 0 && (
              <OneMessageForwardBlock
                forwardMessages={message.forwardMessages}
              />
            )}
          <div className={st.message_content_time}>
            {funcMessage.getTimeMessage(message)}
          </div>
          {dataMessage.dropDown &&
            Object.keys(selectForwardMessage).length == 0 && (
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
                      funcMessage.selectForward(
                        setSelectForwardMessage,
                        selectForwardMessage,
                        message,
                        setOverflow,
                        setIsSelect
                      )
                    }
                    className={st.message_block_dropdown_item}
                  >
                    {t("mainChatContent.selectMessage")}
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
