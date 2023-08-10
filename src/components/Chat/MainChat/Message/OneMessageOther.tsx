import React, { Dispatch, FC, SetStateAction } from "react";
import st from "../../../../styles/message.module.css";
import { IMessage } from "../../../../types/IMessage";
import { Socket } from "socket.io-client";
import { IuserChat } from "../../../../types/IUser";
import { useFuncMessage } from "../../../../Hooks/useFuncMessage";
import { useDataMessage } from "../../../../Hooks/useDataMessage";
import OneMessageWithImg from "./OneMessageWithImg";

export interface IPropsOneMessageOther {
  message: IMessage;
  setOverflow: Dispatch<SetStateAction<string>>;
  socket: Socket;
  userWho: IuserChat;
}

export const OneMessageOther: FC<IPropsOneMessageOther> = ({
  message,
  socket,
  setOverflow,
  userWho,
}) => {
  const funcMessage = useFuncMessage();
  const dataMessage = useDataMessage(setOverflow);
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
                {/* <li
                      onClick={editF}
                      className={st.message_block_dropdown_item}
                    >
                      edit
              </li> */}
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