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
