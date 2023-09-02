import { AxiosProgressEvent } from "axios";
import { $authHost } from ".";
import {
  IEditMessageWithImg,
  IMessageCreateDto,
  IMessageLoadingImgs,
} from "../types/IMessage";

export const createMessageImg = async (data2: FormData) => {
  const { data } = await $authHost.post("api/message/createWithImg", data2);
  return data;
};

export const createMessage = async (dto: IMessageCreateDto) => {
  const { data } = await $authHost.post("api/message/create", dto);
  return data;
};

export const getAllMessageForChat = async (chadId: string) => {
  const { data } = await $authHost.get("api/message/getAllForChat/" + chadId);
  return data;
};

export const getOnePartMessage = async (chatId: string, partId: string) => {
  const { data } = await $authHost.get(
    "api/message/getMessage/limit=10/chat=" + chatId + "/part=" + partId
  );
  return data;
};

export const uploadFile = async (formData: FormData) => {
  const { data } = await $authHost.post(
    "api/storage/uploadStorageFile",
    formData
  );
  return data;
};
export const removeFile = async (oneFile: IEditMessageWithImg) => {
  const { data } = await $authHost.post("api/storage/removeOneFile", oneFile);
};

export const lastMessage = async () => {
  const { data } = await $authHost.get("api/message/lastMessage");
  if (data) return data;
};

export const getAllCountUnreadMessage = async () => {
  const { data } = await $authHost.get("api/message/getAllCountUnreadMessage");
  return data;
};
