import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { findAllLeftChat, findCharForUser } from "../http/chat.services";
import {
  findUserWhoBlockedMe,
  findUserWhoWasBlockedMe,
} from "../http/blockUser.services";
import { ILastMessage, IMessage, IMessageRead } from "../types/IMessage";
import { IChatWithUser } from "../types/IChat";
import {
  getAllMessageForChat,
  getOnePartMessage,
} from "../http/message.service";
import { IUseChatSocket, IUseUnreadMessage } from "../types/IUse";

export function useSocketMessage(
  socket: Socket,
  isLeft: boolean,
  chat: IChatWithUser,
  chats: IUseChatSocket
) {
  const user = useAppSelector(selectUser);
  const [messages, SetMessages] = useState<IMessage[]>([]);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(true);
  const message = (content: IMessage) => {
    // socket.emit("updateIsReadMessage", { messageId: content.id });
    SetMessages((messages) => {
      console.log("пришло сообщение в чате = ", chat.id);
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
  const messageDeleteWasAnswered = (idMessageWasAnswered: string) => {
    SetMessages((messages) => {
      return [
        ...messages.map((oneMessage) => {
          if (
            oneMessage.messageWasAnswered &&
            Object.keys(oneMessage.messageWasAnswered).length !== 0 &&
            oneMessage.messageWasAnswered.id === idMessageWasAnswered
          )
            oneMessage.messageWasAnswered = {} as IMessage;
          return oneMessage;
        }),
      ];
    });
  };

  const messageUpdateWasAnswered = (messageWasAnswered: IMessage) => {
    SetMessages((messages) => {
      return [
        ...messages.map((oneMessage) => {
          if (
            oneMessage.messageWasAnswered &&
            Object.keys(oneMessage.messageWasAnswered).length !== 0 &&
            oneMessage.messageWasAnswered.id === messageWasAnswered.id
          ) {
            oneMessage.messageWasAnswered = messageWasAnswered;
          }
          return oneMessage;
        }),
      ];
    });
  };

  const deleteForward = (forwardId: string) => {
    SetMessages((messages) => {
      return [
        ...messages.map((oneMessage) => {
          if (
            oneMessage.forwardMessages &&
            Object.keys(oneMessage.forwardMessages).length !== 0
          ) {
            oneMessage.forwardMessages = oneMessage.forwardMessages.filter(
              (oneForward) => oneForward.id !== forwardId
            );
          }
          return oneMessage;
        }),
      ];
    });
  };

  useEffect(() => {
    getFirstMessages();
    if (!isLeft) {
      // deleteForward
      socket.on(`message${chat.id}`, message);
      socket.on(`messageDelete${chat.id}`, messageDelete);
      socket.on(`messageUpdate${chat.id}`, messageUpdate);
      socket.on(`deleteMessageWasAnswered${chat.id}`, messageDeleteWasAnswered);
      socket.on(`editWasAnswered${chat.id}`, messageUpdateWasAnswered);
      socket.on(`deleteForward${chat.id}`, deleteForward);
      return () => {
        socket.off(`message${chat.id}`, message);
        socket.off(`messageDelete${chat.id}`, messageDelete);
        socket.off(`messageUpdate${chat.id}`, messageUpdate);
        socket.off(
          `deleteMessageWasAnswered${chat.id}`,
          messageDeleteWasAnswered
        );
        socket.off(`deleteForward${chat.id}`, deleteForward);
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

  // const readMessage = (data: IMessage[]) => {
  //   console.log("данные что зашли", data);
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].isRead === false) {
  //       socket.emit("updateIsReadMessage", { messageId: data[i].id });
  //       unReadMessage.setIsReadCount((isReadCount) => {
  //         return isReadCount.map((oneItem) => {
  //           if (oneItem.chatId === data[i].chatId) {
  //             if (oneItem.count > 0) oneItem.count -= 1;
  //           }
  //           return oneItem;
  //         });
  //       });
  //     }
  //   }
  // };
  const getFirstMessages = async () => {
    if (chat.id)
      await getOnePartMessage(chat.id, "1")
        .then((data) => {
          // readMessage(data.messages);
          SetMessages(data.messages);
          setIsNewMessage(true);
          setAllPart(data.allPart);
        })
        .finally(() => {
          setLoading(false);
          setCurrentPart(1);
        });
    chats.setMasT((masT) => {
      return masT.map((oneItem) => {
        if (chat.id === oneItem.id) {
          oneItem.countUnreadMessage = 0;
        }
        return oneItem;
      });
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
