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
  name: string;
  userWhoCreateId: string;
  avatarUrl: string;
}
export interface IChatUser {
  id: string;
  chatId: string;
  userId: string;
}

export interface IChatWithUser extends IChat {
  users: IuserChat[];
  countUnreadMessage: number;
}
export interface ILeftChatUser extends LeftChat {
  user?: IuserChat;
}
export interface LeftChat {
  id: string;
  chatId: string;
  userId: string;
}
