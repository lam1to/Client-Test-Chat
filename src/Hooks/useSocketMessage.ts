import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import {
  findAllLeftChat,
  findCharForUser,
  getAllMessageForChat,
} from "../http/chat.services";
import {
  findUserWhoBlockedMe,
  findUserWhoWasBlockedMe,
} from "../http/blockUser.services";
import { ILastMessage, IMessage } from "../types/IMessage";
import { IChatWithUser } from "../types/IChat";

export function useSocketMessage(
  socket: Socket,
  isLeft: boolean,
  chat: IChatWithUser,
  lastMessageChat: ILastMessage[],
  setLastMessageChat: Dispatch<SetStateAction<ILastMessage[]>>
) {
  const user = useAppSelector(selectUser);
  const [messages, SetMessages] = useState<IMessage[]>([]);
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
    // setLastMessageChat((lastMessageChat) => {
    //   return [
    //     ...lastMessageChat.map((oneLastMessage) => {
    //       if (oneLastMessage.chatId === chat.id) {
    //         if (content.userId === user.user.id) {
    //           oneLastMessage = {
    //             ...content,
    //             name: user.user.name,
    //           };
    //         } else {
    //           oneLastMessage = {
    //             ...content,
    //             name: chat.users.filter(
    //               (oneUser) => oneUser.id === content.userId
    //             )[0].name,
    //           };
    //           return oneLastMessage;
    //         }
    //       }
    //       return oneLastMessage;
    //     }),
    //   ];
    // });
  };
  const messageDelete = (content: IMessage) => {
    try {
      SetMessages((messages) => {
        // setLastMessageChat((lastMessageChat) => [
        //   ...lastMessageChat.map((oneLastMessage) => {
        //     if (
        //       oneLastMessage.id === content.id &&
        //       Object.keys(messages).length !== 0
        //     ) {
        //       const messagesWithoutDeleteMessage = messages.filter(
        //         (oneMessages) => oneMessages.id !== content.id
        //       );
        //       if (messagesWithoutDeleteMessage.length !== 0) {
        //         const lastMessageNow =
        //           messagesWithoutDeleteMessage[
        //             messagesWithoutDeleteMessage.length - 1
        //           ];

        //         if (lastMessageNow.userId === user.user.id) {
        //           oneLastMessage = {
        //             ...lastMessageNow,
        //             name: user.user.name,
        //           };
        //         } else {
        //           oneLastMessage = {
        //             ...lastMessageNow,
        //             name: chat.users.filter(
        //               (oneUser) =>
        //                 oneUser.id === messages[messages.length - 2].userId
        //             )[0].name,
        //           };
        //         }
        //         return oneLastMessage;
        //       } else {
        //         oneLastMessage = undefined;
        //       }
        //     }
        //     return oneLastMessage;
        //   }),
        // ]);
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
    getMessages();
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
  const getMessages = async () => {
    if (chat.id) {
      await getAllMessageForChat(chat.id).then((data) => {
        SetMessages(data);
        setLoading(false);
      });
    }
  };
  return { messages, SetMessages, loading, setLoading };
}
