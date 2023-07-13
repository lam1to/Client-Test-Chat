import { $authHost } from ".";

export const findUserWhoWasBlockedMe = async () => {
  const { data } = await $authHost.get("api/blockUser/findAllBlockedForUser");
  return data;
};

export const findUserWhoBlockedMe = async () => {
  const { data } = await $authHost.get("api/blockUser/findAllBlockerForUser");
  return data;
};
