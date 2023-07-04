import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/UserSlice";
import messageReducer from "./Reducers/MessageSlice";

const rootReducer = combineReducers({
  userReducer,
  messageReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
