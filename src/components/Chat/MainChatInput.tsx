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
import MainChatEmoji from "./MainChatEmoji";

export interface PropsMainChatInput {
  socket: Socket;
  chatId: string;
}

const MainChatInput: FC<PropsMainChatInput> = ({ socket, chatId }) => {
  const [content, setContent] = useState<string>("");
  useEffect(() => {}, []);
  const { user } = useAppSelector((state) => state.userReducer);
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
        {/* <MainChatEmoji content={content} setContent={setContent} /> */}
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
