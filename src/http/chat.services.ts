import { $authHost } from ".";

export const findCharForUser = async () => {
  const { data } = await $authHost.get("api/chat/allChat");
  console.log("data in service chat", data);
  return data;
};
