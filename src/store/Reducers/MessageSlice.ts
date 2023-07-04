import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISetIsAuth, IUserState, IuserForState } from "../../types/IUser";
import { IMessage, ImessageState } from "../../types/IMessage";

const initialState: ImessageState = {
  isRead: false,
  message: {} as IMessage,
};
export const MessageSlice = createSlice({
  name: "lastMessage",
  initialState,
  reducers: {
    SetIsRead(state, action: PayloadAction<boolean>) {
      state.isRead = action.payload;
    },
    SetMessage(state, action: PayloadAction<IMessage>) {
      console.log("action in state = ", action.payload);
      state.message = action.payload;
      state.isRead = false;
    },
  },
});

export default MessageSlice.reducer;
