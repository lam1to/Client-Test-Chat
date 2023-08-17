import { error } from "console";
import { $authHost, $host } from ".";
import {
  IUpdateAvatar,
  Iuser,
  IuserChat,
  IuserForState,
  IuserLogin,
} from "../types/IUser";
import { AxiosError } from "axios";
import { IError } from "../types/IError";
import { Dispatch, SetStateAction } from "react";

export const registration = async (
  user: Iuser,
  setError: Dispatch<SetStateAction<IError>>
) => {
  const res = await $host
    .post("api/auth/registration", user)
    .catch((error: AxiosError) => {
      console.log("error = ", error.response?.data);
      console.log("type error = ", error);
      if (error.response?.data)
        setError({ ...error.response?.data, isError: true });
    });

  if (res) {
    const data = res.data;
    localStorage.setItem("token", data.refreshToken);
    return data;
  }
};

export const login = async (
  user: IuserLogin,
  setError: Dispatch<SetStateAction<IError>>
) => {
  const res = await $host
    .post("api/auth/login", user)
    .catch((error: AxiosError) => {
      console.log("error = ", error.response?.data);
      console.log("type error = ", error);
      if (error.response?.data)
        setError({ ...error.response?.data, isError: true });
    });
  if (res) {
    const data = res.data;
    localStorage.setItem("token", data.refreshToken);
    return data;
  }
};

export const check = async () => {
  const { data } = await $authHost.post("api/auth/login/token");
  localStorage.setItem("token", data.refreshToken);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await $authHost.get("api/user/allUsers");
  const users: IuserChat[] = data.users;
  return users;
};

export const updateUserAvatar = async (dto: IUpdateAvatar) => {
  const { data } = await $authHost.post("api/user/updateAvatar", dto);
};
