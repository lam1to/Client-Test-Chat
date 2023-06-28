export interface Iuser {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IuserLogin extends Omit<Iuser, "name" | "lastName"> {}

export interface IuserForState extends Omit<Iuser, "password"> {
  id: string;
  accessToken: string;
  refreshToken: string;
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
