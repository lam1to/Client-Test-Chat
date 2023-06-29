import React, { FC, useEffect, useState } from "react";
import { IAllChatWithUser } from "../../types/IChat";
import { findCharForUser } from "../../http/chat.services";
import OneChat from "./OneChat";
import st from "../../styles/oneChat.module.css";

const ChatRow: FC = () => {
  const [data, setData] = useState<IAllChatWithUser[]>();
  useEffect(() => {
    findCharForUser().then((data) => setData(data));
    console.log("data in chat = ", data);
  }, []);
  return (
    <div>
      <div className={st.chatrow}>
        {data?.map((one, i) => (
          <OneChat
            key={i}
            users={one.users}
            id={one.id}
            type={one.type}
            createdAt={one.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatRow;
