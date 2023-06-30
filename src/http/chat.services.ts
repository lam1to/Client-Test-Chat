import { $authHost } from ".";
import { IChat } from "../types/IChat";

export const findCharForUser = async () => {
  const { data } = await $authHost.get("api/chat/allChat");
  console.log("data in service chat", data);
  return data;
};

export const createChat = async (users: string[]) => {
  const { data } = await $authHost.post("api/chat/createChat", {
    idUsers: users,
  });
  console.log("data create chat in service = ", data);
  return "zaglush";
};
