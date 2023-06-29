import { IuserChat } from "./IUser";

export interface IChatAllInformation {
  chats: IChat[];
  userChat: IChatUser[];
  users: IuserChat[];
}

export interface IChat {
  id: string;
  type: string;
  createdAt: string;
}
export interface IChatUser {
  id: string;
  chatId: string;
  userId: string;
}

export interface IAllChatWithUser extends IChat {
  users: IuserChat[];
}
