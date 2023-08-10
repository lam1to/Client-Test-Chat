export interface IMessage {
  id: string;
  content: string;
  chatId: string;
  userId: string;
  createdAt: string;
  contentImg?: IContentImg[];
}

export interface IMessageCreateDto {
  content: string;
  chatId: string;
  userId: string;
}

export interface IContentImg {
  id: string;
  messageId: string;
  image_url: string;
}

export interface IStorageUrl {
  imgUrl: string;
}

export interface ImessageState {
  isRead: boolean;
  message: IMessage;
}
