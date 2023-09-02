import { Socket } from "socket.io-client";
import { IChatWithUser, ILeftChatUser } from "../types/IChat";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { findCharForUser } from "../http/chat.services";

export function useSocketChats(
  socket: Socket,
  setSelectChats: Dispatch<SetStateAction<IChatWithUser>>
) {
  const [chats, setChats] = useState<IChatWithUser[]>([] as IChatWithUser[]);
  const chatCreate = (content: IChatWithUser) => {
    setChats((chats) => {
      if (chats.length === 0) {
        return [...chats, content];
      }
      if (chats.length > 0 && content.id !== chats[chats.length - 1].id) {
        return [...chats, content];
      }
      return chats;
    });
  };
  const chatDelete = (deleteChat: IChatWithUser) => {
    setChats((chats) =>
      chats.filter((OneChat) => {
        return OneChat.id !== deleteChat.id;
      })
    );
    setSelectChats({} as IChatWithUser);
  };
  const user = useAppSelector(selectUser);
  useEffect(() => {
    socket.on(`chatCreate${user.user.id}`, chatCreate);
    socket.on(`chatDelete${user.user.id}`, chatDelete);
    getChat();
    return () => {
      socket.off(`chatCreate${user.user.id}`, chatCreate);
      socket.off(`chatDelete${user.user.id}`, chatDelete);
    };
  }, []);
  const getChat = async () => {
    await findCharForUser().then((data) => { 
      console.log("data = ",data)
      setChats(data)});
  };
  const editLeftChat = (oneLeftChat: ILeftChatUser, flag: boolean) => {
    if (flag) {
      setChats([
        ...chats.map((oneChat) => {
          if (oneChat.id === oneLeftChat.chatId) {
            oneChat.users = oneChat.users.filter((oneUser) => {
              return oneUser.id !== oneLeftChat.userId;
            });
          }
          return oneChat;
        }),
      ]);
    } else {
      setChats([
        ...chats.map((oneChat) => {
          if (
            oneChat.id === oneLeftChat.chatId &&
            oneLeftChat.user &&
            !oneChat.users.some(
              (oneUser) => oneUser.id === oneLeftChat.user?.id
            )
          ) {
            oneChat.users = [...oneChat.users, oneLeftChat.user];
          }
          return oneChat;
        }),
      ]);
    }
  };
  return { masT: chats, setMasT: setChats, editLeftChat: editLeftChat };
}
