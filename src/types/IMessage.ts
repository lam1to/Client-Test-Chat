export interface IMessage {
  id: string;
  content: string;
  chatId: string;
  userId: string;
  createdAt: string;
}

export interface ImessageState {
  isRead: boolean;
  message: IMessage;
}
