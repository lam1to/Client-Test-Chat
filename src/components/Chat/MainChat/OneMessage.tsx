import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IMessage } from "../../../types/IMessage";
import st from "../../../styles/message.module.css";
import { useAppSelector } from "../../../Hooks/redux";
import { IuserChat } from "../../../types/IUser";
import { useOutsideClick } from "outsideclick-react";
import { selectUser } from "../../../store/Reducers/UserSlice";
import { useFuncMessage } from "../../../Hooks/useFuncMessage";

interface PropsOneMessage {
  message: IMessage;
  userWho: IuserChat;
  setOverflow: Dispatch<SetStateAction<string>>;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  removeMessage: (message: IMessage) => void;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
}
export interface Position {
  x: number;
  y: number;
}

const OneMessage: FC<PropsOneMessage> = ({
  message,
  userWho,
  setOverflow,
  contentRef,
  removeMessage,
  setEditMessage,
}) => {
  const time = message.createdAt.slice(11, 16);
  const user = useAppSelector(selectUser);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const handleOutsideClick = () => {
    setDropDown(false);
    setOverflow("auto");
  };
  const funcMessage = useFuncMessage();
  const [xYPosistion, setXyPosistion] = useState<Position>({ x: 0, y: 0 });
  const ref = useOutsideClick(handleOutsideClick);
  return (
    <div className={st.one_message}>
      {message.content.slice(0, 6) === "admin:" ? (
        <div className={st.one_message_leftChat}>
          {message.content.slice(6)}
        </div>
      ) : user.user.id == message.userId ? (
        <div className={st.message_block_self}>
          <div
            className={`${st.message_container} ${st.message_container_self}`}
          >
            <div
              onContextMenu={(e) =>
                funcMessage.onVisible(
                  e,
                  setOverflow,
                  setXyPosistion,
                  dropDown,
                  setDropDown
                )
              }
              ref={ref}
              onClick={(e) => {
                funcMessage.onVisible(
                  e,
                  setOverflow,
                  setXyPosistion,
                  dropDown,
                  setDropDown
                );
              }}
              className={st.message_content_self}
            >
              <div>{message.content}</div>
              <div className={st.message_content_time_self}>{time}</div>
              {/* {dropDown && (
                <div
                  style={{ top: xYPosistion.y, left: xYPosistion.x - 100 }}
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
                          removeMessage,
                          setDropDown,
                          message
                        )
                      }
                      className={st.message_block_dropdown_item}
                    >
                      delete
                    </li>
                  </ul>
                </div>
              )} */}
            </div>
          </div>
        </div>
      ) : (
        <div className={st.message_block_other}>
          <div className={st.message_container}>
            {userWho && (
              <div className={st.message_who_send}>{userWho.name}</div>
            )}
            <div
              onContextMenu={(e) =>
                funcMessage.onVisible(
                  e,
                  setOverflow,
                  setXyPosistion,
                  dropDown,
                  setDropDown
                )
              }
              ref={ref}
              onClick={(e) => {
                funcMessage.onVisible(
                  e,
                  setOverflow,
                  setXyPosistion,
                  dropDown,
                  setDropDown
                );
              }}
              className={st.message_content_other}
            >
              <div>{message.content}</div>
              <div className={st.message_content_time}>{time}</div>
              {/* {dropDown && (
                <div
                  style={{ top: xYPosistion.y, left: xYPosistion.x }}
                  className={st.message_block_dropdown}
                >
                  <ul className={st.message_block_dropdown_row}>
                    {/* <li
                      onClick={editF}
                      className={st.message_block_dropdown_item}
                    >
                      edit
                    </li> }
                    <li
                      onClick={(e) =>
                        funcMessage.deleteF(
                          e,
                          setOverflow,
                          removeMessage,
                          setDropDown,
                          message
                        )
                      }
                      className={st.message_block_dropdown_item}
                    >
                      delete
                    </li>
                  </ul>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneMessage;
