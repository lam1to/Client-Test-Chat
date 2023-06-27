import { Component } from "react";
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTR_ROUTE } from "../../utils/const";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import Chat from "../Chat/Chat";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: Login,
  },
  {
    path: REGISTR_ROUTE,
    component: Registration,
  },
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    component: Chat,
  },
];
