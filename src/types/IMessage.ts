export interface IMessage {
  id: string;
  content: string;
  chatId: string;
  userId: string;
  createdAt: string;
  contentImg?: IContentImg[];
  messageWasAnswered?: IMessage;
}

export interface ILastMessage extends IMessage {
  name: string;
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
export interface IEditMessageWithImg {
  image_url: string;
}

export interface IStorageUrl {
  imgUrl: string;
}

export interface ImessageState {
  isRead: boolean;
  message: IMessage;
}

export interface IMessageLoadingImgs {
  id: number;
  isLoading: boolean;
}
