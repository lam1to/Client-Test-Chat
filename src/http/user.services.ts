import { $authHost, $host } from ".";
import { Iuser, IuserForState, IuserLogin } from "../types/IUser";

export const registration = async (user: Iuser) => {
  const { data } = await $host.post("api/auth/registration", user);
  localStorage.setItem("token", data.refreshToken);
  return data;
};

export const login = async (user: IuserLogin) => {
  const { data } = await $host.post("api/auth/login", user);
  localStorage.setItem("token", data.refreshToken);
  return data;
};

export const check = async () => {
  const { data } = await $authHost.post("api/auth/login/token");
  localStorage.setItem("token", data.refreshToken);
  return data;
};
