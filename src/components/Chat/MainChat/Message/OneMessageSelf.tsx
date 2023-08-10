import React, { Dispatch, FC, SetStateAction, useState } from "react";
import st from "../../../../styles/message.module.css";
import { useFuncMessage } from "../../../../Hooks/useFuncMessage";
import { IMessage } from "../../../../types/IMessage";
import { useDataMessage } from "../../../../Hooks/useDataMessage";
import { Socket } from "socket.io-client";
import OneMessageWithImg from "./OneMessageWithImg";

export interface IPropsOneMessageSelf {
  message: IMessage;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  setOverflow: Dispatch<SetStateAction<string>>;
  socket: Socket;
}

const OneMessageSelf: FC<IPropsOneMessageSelf> = ({
  message,
  contentRef,
  setEditMessage,
  socket,
  setOverflow,
}) => {
  const funcMessage = useFuncMessage();
  const dataMessage = useDataMessage(setOverflow);
  //   console.log("message[", message.id, "] = ", message);
  return (
    <div className={st.message_block_self}>
      <div className={`${st.message_container} ${st.message_container_self}`}>
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
          className={st.message_content_self}
        >
          {message.contentImg &&
            Object.keys(message.contentImg).length !== 0 && (
              <OneMessageWithImg contentImg={message.contentImg} />
            )}
          <div>{message.content}</div>
          <div className={st.message_content_time_self}>
            {funcMessage.getTimeMessage(message)}
          </div>
          {dataMessage.dropDown && (
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
                      setEditMessage
                    )
                  }
                  className={st.message_block_dropdown_item}
                >
                  edit
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
                  delete
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
