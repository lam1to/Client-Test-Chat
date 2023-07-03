import React, { Dispatch, FC, SetStateAction, useEffect } from "react";

import Picker from "emoji-picker-react";
import stickerPng from "../../public/png-transparent-iphone-emoji-smiley-computer-icons-sick-transformed.png";
import st from "../../styles/mainChat.module.css";
export interface PropsMainChatEmoji {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const MainChatEmoji: FC<PropsMainChatEmoji> = ({ content, setContent }) => {
  useEffect(() => {}, []);
  return (
    <div className={st.stickers}>
      <div className={st.stickers_img}>
        <img src={stickerPng} alt="" />
      </div>
      <div className={st.stickers_block}>
        <Picker
          autoFocusSearch={false}
          lazyLoadEmojis={true}
          //   emojiStyle={EmojiStyle.APPLE}
          //   onEmojiClick={(e) => setContent(`${content} ${e.emoji}`)}
          //   theme={Theme.DARK}
        />
      </div>
    </div>
  );
};

export default MainChatEmoji;
