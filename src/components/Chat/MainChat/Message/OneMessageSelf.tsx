import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import st from "../../../../styles/message.module.css";
import { useFuncMessage } from "../../../../Hooks/useFuncMessage";
import { IMessage } from "../../../../types/IMessage";
import { useDataMessage } from "../../../../Hooks/useDataMessage";
import { Socket } from "socket.io-client";
import OneMessageWithImg from "./OneMessageWithImg";
import { useTranslation } from "react-i18next";
import BlockMessageWasAnswered from "./BlockMessageWasAnswered";
import OneMessageForwardBlock from "./OneMessageForwardBlock";

export interface IPropsOneMessageSelf {
  message: IMessage;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  setReplyMessage: Dispatch<SetStateAction<IMessage>>;
  setOverflow: Dispatch<SetStateAction<string>>;
  socket: Socket;
  setSelectForwardMessage: Dispatch<SetStateAction<IMessage[]>>;
  selectForwardMessage: IMessage[];
}

const OneMessageSelf: FC<IPropsOneMessageSelf> = ({
  message,
  contentRef,
  setEditMessage,
  socket,
  setOverflow,
  setReplyMessage,
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
    <div className={st.message_block_self}>
      <div className={`${st.message_container} ${st.message_container_self}`}>
        <div
          onContextMenu={(e) =>
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
                )
          }
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
          className={`${st.message_content_self} ${
            Object.keys(selectForwardMessage).length !== 0 &&
            isSelect &&
            st.message_content_self_activ
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
          <div className={st.message_content_time_self}>
            {funcMessage.getTimeMessage(message)}
          </div>
          {dataMessage.dropDown &&
            Object.keys(selectForwardMessage).length == 0 && (
              <div
                style={{
                  top: dataMessage.xYPosistion.y,
                  left: dataMessage.xYPosistion.x - 100,
                }}
                className={st.message_block_dropdown}
              >
                <ul className={st.message_block_dropdown_row}>
                  <li
                    onClick={(e) =>
                      funcMessage.editF(
                        e,
                        setOverflow,
                        contentRef,
                        message,
                        setEditMessage,

                        setReplyMessage
                      )
                    }
                    className={st.message_block_dropdown_item}
                  >
                    {t("mainChatContent.editMessage")}
                  </li>
                  <li
                    onClick={(e) =>
                      funcMessage.replyMessage(
                        setOverflow,
                        contentRef,
                        message,
                        setReplyMessage,
                        setEditMessage
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

export default OneMessageSelf;
