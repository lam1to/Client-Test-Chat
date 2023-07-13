import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { ISetIsAuth, IUserState, IuserForState } from "../../types/IUser";
import { RootState } from "../store";

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
    SetUserN(state, action: PayloadAction<IuserForState>) {
      state.user = action.payload;
      state.isAuth = false;
    },
  },
});
export const selectUserState = (state: RootState) => state.userReducer;
export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);
export const selectIsAuth = createSelector(
  selectUserState,
  (state) => state.isAuth
);
export default UserSlice.reducer;
