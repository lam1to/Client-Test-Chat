import React, { FC, useEffect, useRef } from "react";
import st from "../../styles/mainChat.module.css";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../Hooks/redux";
import stickerPng from "../../public/png-transparent-iphone-emoji-smiley-computer-icons-sick-transformed.png";
import Picker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";

export interface PropsMainChatInput {
  socket: Socket;
  chatId: string;
}

const MainChatInput: FC<PropsMainChatInput> = ({ socket, chatId }) => {
  const contentRef = useRef<HTMLInputElement>({} as HTMLInputElement);
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
  return (
    <div className={st.main_chat_input}>
      <div className={st.main_chat_form}>
        <input
          placeholder="Введите сообщение "
          type="text"
          className={st.main_chat_form_input}
          ref={contentRef}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              createMessageF();
            }
          }}
        />
        <div className={st.stickers}>
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
        </div>
        <button
          onClick={() => createMessageF()}
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
