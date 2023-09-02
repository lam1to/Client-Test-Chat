import { Dispatch, SetStateAction } from "react";
import { IMessageRead } from "./IMessage";
import { IChatWithUser, ILeftChatUser } from "./IChat";

export interface IUseUnreadMessage {
  isReadCount: IMessageRead[];
  setIsReadCount: Dispatch<SetStateAction<IMessageRead[]>>;
  getItemForChat: (chatId: string) => IMessageRead | undefined;
}

export interface IUseChatSocket {
  masT: IChatWithUser[];
  setMasT: Dispatch<SetStateAction<IChatWithUser[]>>;
  editLeftChat: (oneLeftChat: ILeftChatUser, flag: boolean) => void;
}
