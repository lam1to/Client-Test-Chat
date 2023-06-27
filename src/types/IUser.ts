export interface Iuser {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IuserLogin extends Omit<Iuser, "name" | "lastName"> {}
