import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { findAllLeftChat, findCharForUser } from "../http/chat.services";
import {
  findUserWhoBlockedMe,
  findUserWhoWasBlockedMe,
} from "../http/blockUser.services";
import { ILastMessage, IMessage } from "../types/IMessage";
import { IChatWithUser } from "../types/IChat";
import {
  getAllMessageForChat,
  getOnePartMessage,
} from "../http/message.service";

export function useSocketMessage(
  socket: Socket,
  isLeft: boolean,
  chat: IChatWithUser
) {
  const user = useAppSelector(selectUser);
  const [messages, SetMessages] = useState<IMessage[]>([]);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
  const message = (content: IMessage) => {
    SetMessages((messages) => {
      if (
        messages.length > 0 &&
        content.id === messages[messages.length - 1].id
      ) {
        return messages;
      }
      return [...messages, content];
    });
    setIsNewMessage(true);
  };
  const messageDelete = (content: IMessage) => {
    try {
      SetMessages((messages) => {
        return messages.filter((oneMessage) => {
          return oneMessage.id !== content.id;
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  const messageUpdate = (content: IMessage) => {
    SetMessages((messages) =>
      messages.map((oneMessage) =>
        oneMessage.id === content.id ? content : oneMessage
      )
    );
  };

  useEffect(() => {
    getFirstMessages();
    if (!isLeft) {
      socket.on(`message${chat.id}`, message);
      socket.on(`messageDelete${chat.id}`, messageDelete);
      socket.on(`messageUpdate${chat.id}`, messageUpdate);
      return () => {
        socket.off(`message${chat.id}`, message);
        socket.off(`messageDelete${chat.id}`, messageDelete);
        socket.off(`messageUpdate${chat.id}`, messageUpdate);
      };
    }
  }, [chat, isLeft]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(false);
  const [currentPart, setCurrentPart] = useState<number>(1);
  const [allPart, setAllPart] = useState<number>(0);
  useEffect(() => {
    getMessages();
  }, [fetching]);

  const getFirstMessages = async () => {
    if (chat.id)
      await getOnePartMessage(chat.id, "1")
        .then((data) => {
          SetMessages(data.messages);

          setAllPart(data.allPart);
        })
        .finally(() => {
          setLoading(false);
          setFetching(false);
          setCurrentPart(1);
        });
  };
  const getMessages = async () => {
    if (Object.keys(chat).length !== 0 && chat.id && fetching) {
      // await getAllMessageForChat(chat.id).then((data) => {
      //   SetMessages(data);
      //   setLoading(false);
      // });
      await getOnePartMessage(chat.id, `${currentPart}`).then((data) => {
        if (currentPart <= allPart) {
          SetMessages((messages) => {
            return [...data.messages, ...messages];
          });
        }
        setLoading(false);
        setFetching(false);
      });
    }
  };

  return {
    messages,
    SetMessages,
    loading,
    setLoading,
    currentPart,
    setCurrentPart,
    fetching,
    setFetching,
    allPart,
    isNewMessage,
    setIsNewMessage,
  };
}
