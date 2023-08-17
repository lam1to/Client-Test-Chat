import React, { FC } from "react";
import st from "../../../../styles/mainChat.module.css";
import { useFuncInput } from "../../../../Hooks/useFuncInput";
const testOne: FC<{ oneSelectFile: File }> = ({ oneSelectFile }) => {
  const funcInput = useFuncInput();
  return (
    <div>
      <img
        className={st.main_chat_input_upload_block_main_img}
        src={funcInput.funcReader(oneSelectFile)}
      />
    </div>
  );
};

export default testOne;
