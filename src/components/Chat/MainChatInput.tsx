import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import st from "../../styles/mainChat.module.css";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../Hooks/redux";
import EmojiPicker from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import stickerPng from "../../public/png-transparent-iphone-emoji-smiley-computer-icons-sick-transformed.png";
export interface PropsMainChatInput {
  socket: Socket;
  chatId: string;
}

const MainChatInput: FC<PropsMainChatInput> = ({ socket, chatId }) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [content, setContent] = useState<string>("");
  useEffect(() => {}, []);

  const createMessageF = async () => {
    socket.emit("createGateway", {
      userId: user.user.id,
      chatId: chatId,
      content: content,
    });
    setContent("");
  };

  return (
    <div className={st.main_chat_input}>
      <div className={st.main_chat_form}>
        <input
          placeholder="Введите сообщение "
          type="text"
          className={st.main_chat_form_input}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
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
            <EmojiPicker
              emojiStyle={EmojiStyle.APPLE}
              onEmojiClick={(e) => setContent(`${content} ${e.emoji}`)}
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
