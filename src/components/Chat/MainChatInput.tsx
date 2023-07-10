import React, { FC, useEffect, useRef, Dispatch, SetStateAction } from "react";
import st from "../../styles/mainChat.module.css";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../Hooks/redux";
import stickerPng from "../../public/png-transparent-iphone-emoji-smiley-computer-icons-sick-transformed.png";
import Picker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { IMessage } from "../../types/IMessage";
import pencilImg from "../../public/pencil.png";
import { IuserChat } from "../../types/IUser";
export interface PropsMainChatInput {
  socket: Socket;
  chatId: string;
  contentRef: React.MutableRefObject<HTMLInputElement>;
  editMessage: IMessage;
  setEditMessage: Dispatch<SetStateAction<IMessage>>;
  users: IuserChat[];
}

const MainChatInput: FC<PropsMainChatInput> = ({
  socket,
  chatId,
  contentRef,
  editMessage,
  setEditMessage,
  users,
}) => {
  useEffect(() => {}, []);
  const { user } = useAppSelector((state) => state.userReducer);
  const createMessageF = async () => {
    socket.emit("createGateway", {
      userId: user.user.id,
      chatId: chatId,
      content: contentRef.current?.value,
    });
    contentRef.current.value = "";
  };
  const editMessageF = () => {
    setEditMessage({} as IMessage);
    console.log("edit in input");
    socket.emit("updateMessage", {
      messageId: editMessage.id,
      content: contentRef.current?.value,
      usersId: [
        user.user.id,
        ...users.map((oneUser) => {
          return oneUser.id;
        }),
      ],
    });
    contentRef.current.value = "";
  };
  console.log(Object.keys(editMessage).length === 0);
  return (
    <div className={st.main_chat_input}>
      {Object.keys(editMessage).length !== 0 && (
        <div className={st.main_chat_input_edit_block}>
          <div className={st.main_chat_input_edit_container}>
            <div className={st.main_chat_input_edit_img}>
              <img src={pencilImg} alt="" />
            </div>
            <div className={st.main_chat_input_edit_title}>
              {"Редактирование: " + editMessage.content}
            </div>
          </div>
          <div
            onClick={() => {
              setEditMessage({} as IMessage);
              contentRef.current.value = "";
            }}
            className={st.main_chat_input_edit_close}
          >
            Close
          </div>
        </div>
      )}

      <div className={st.main_chat_form}>
        <input
          placeholder="Введите сообщение "
          type="text"
          className={st.main_chat_form_input}
          ref={contentRef}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              Object.keys(editMessage).length !== 0
                ? editMessageF()
                : createMessageF();
            }
          }}
        />
        {/* <div className={st.stickers}>
          <div className={st.stickers_img}>
            <img src={stickerPng} alt="" />
          </div>
          <div className={st.stickers_block}>
            <Picker
              height={window.innerWidth <= 500 ? 300 : 400}
              width={window.innerWidth <= 500 ? 300 : 300}
              autoFocusSearch={false}
              lazyLoadEmojis={true}
              emojiStyle={EmojiStyle.APPLE}
              onEmojiClick={(e) =>
                (contentRef.current.value = `${contentRef.current?.value}${e.emoji}`)
              }
              theme={Theme.DARK}
            />
          </div>
        </div> */}
        <button
          onClick={() => {
            Object.keys(editMessage).length !== 0
              ? editMessageF()
              : createMessageF();
          }}
          type="button"
          className={st.main_chat_form_button}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default MainChatInput;
