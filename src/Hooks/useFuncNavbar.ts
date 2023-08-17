import { Dispatch, SetStateAction } from "react";
import { uploadFile } from "../http/message.service";
import { Socket } from "socket.io-client";
import { updateUserAvatar, updateUserFi } from "../http/user.services";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";
import { IFi } from "../components/Modal/ModalUserInfo";
import { domainToASCII } from "url";

export const useFuncNavbar = () => {
  const user = useAppSelector(selectUser);
  const uploadNewAvatar = async (
    newAvatar: File,
    setNewAvatar: Dispatch<SetStateAction<File>>
  ) => {
    const formData = new FormData();
    let image_url = "";
    formData.append("file", newAvatar);
    await uploadFile(formData).then((data) => {
      setNewAvatar({} as File);
      image_url = data.imgUrl;
    });
    await updateUserAvatar({ id: user.user.id, avatar_path: image_url });
    setNewAvatar({} as File);
  };
  const editFi = async (
    newFi: IFi,
    setNewFi: Dispatch<SetStateAction<IFi>>
  ) => {
    await updateUserFi(newFi).then((data) => setNewFi({} as IFi));
  };
  return { uploadNewAvatar: uploadNewAvatar, editFi: editFi };
};
