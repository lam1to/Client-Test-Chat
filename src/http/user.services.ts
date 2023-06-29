import { $authHost, $host } from ".";
import { Iuser, IuserChat, IuserForState, IuserLogin } from "../types/IUser";

export const registration = async (user: Iuser) => {
  const { data } = await $host.post("api/auth/registration", user);
  console.log("data in service", data);
  localStorage.setItem("token", data.refreshToken);
  return data;
};

export const login = async (user: IuserLogin) => {
  const { data } = await $host.post("api/auth/login", user);
  console.log("data in service", data);
  localStorage.setItem("token", data.refreshToken);
  return data;
};

export const check = async () => {
  console.log("zashlo2");
  const { data } = await $authHost.post("api/auth/login/token");
  localStorage.setItem("token", data.refreshToken);
  console.log("user in check", data.user);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await $authHost.get("api/user/allUsers");
  const users: IuserChat[] = data.users;
  console.log("all users in serv", users);
  return users;
};
