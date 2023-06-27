import { $host } from ".";
import { Iuser, IuserLogin } from "../types/IUser";

export const registration = async (user: Iuser) => {
  const { data } = await $host.post("api/auth/registration", user);
  return data;
};

export const login = async (user: IuserLogin) => {
  const { data } = await $host.post("api/auth/login", user);
  return data;
};
