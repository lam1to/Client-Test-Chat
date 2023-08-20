import { $authHost } from ".";
import { IChat } from "../types/IChat";

export const findCharForUser = async () => {
  const { data } = await $authHost.get("api/chat/allChat");
  return data;
};

export const createChat = async (users: string[]) => {
  const { data } = await $authHost.post("api/chat/createChat", {
    idUsers: users,
  });
  return data;
};

export const remove = async (chatId: string) => {
  const { data } = await $authHost.delete("api/chat/" + chatId);
  return data;
};

export const findAllLeftChat = async () => {
  const { data } = await $authHost.get("api/leftChat/allLeftChat");
  return data;
};
