import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISetIsAuth, IUserState, IuserForState } from "../../types/IUser";

const initialState: IUserState = {
  isAuth: false,
  user: {} as IuserForState,
};
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    SetUser(state, action: PayloadAction<IuserForState>) {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export default UserSlice.reducer;
