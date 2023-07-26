import stickerPng from "../../../public/png-transparent-iphone-emoji-smiley-computer-icons-sick-transformed.png";
import Picker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import st from "../../../styles/mainChat.module.css";
import { FC } from "react";
interface IPropsInputEmoji {
  contentRef: React.MutableRefObject<HTMLInputElement>;
}
const InputEmoji: FC<IPropsInputEmoji> = ({ contentRef }) => {
  return (
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
  );
};

export default InputEmoji;
