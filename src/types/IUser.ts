export interface Iuser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatar_path: string;
}
export interface IuserLogin extends Omit<Iuser, "name" | "lastName"> {}

export interface IuserForState extends Omit<Iuser, "password"> {
  user: Iuser;
  accessToken: string;
  refreshToken: string;
}
export interface IuserChat extends Iuser {
  avatarPath: string;
  id: string;
  createdAt: string;
  updateAt: string;
}

export enum EUserActionTypes {
  SET_ISAUTH = "SET_ISAUTH",
  SET_USER = "SET_USER",
}

export interface IUserState {
  isAuth: boolean;
  user: IuserForState;
}

export interface ISetIsAuth {
  payload: boolean;
}
export interface ISetUser {
  type: EUserActionTypes.SET_USER;
  payload: IuserForState;
}

export interface IBlockUser {
  user_Who_BlocketId: string;
  user_Who_Was_BlocketId: string;
}

export interface IUpdateAvatar {
  id: string;
  avatar_path: string;
}
