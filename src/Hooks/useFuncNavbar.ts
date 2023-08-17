import { Dispatch, SetStateAction } from "react";
import { uploadFile } from "../http/message.service";
import { Socket } from "socket.io-client";
import { updateUserAvatar } from "../http/user.services";
import { useAppSelector } from "./redux";
import { selectUser } from "../store/Reducers/UserSlice";

export const useFuncNavbar = () => {
  const user = useAppSelector(selectUser);
  const uploadNewAvatar = async (
    newAvatar: File,
    setNewAvatar: Dispatch<SetStateAction<File>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    const formData = new FormData();
    setIsLoading(true);
    let image_url = "";
    formData.append("file", newAvatar);
    await uploadFile(formData).then((data) => {
      setIsLoading(false);
      setNewAvatar({} as File);
      image_url = data.imgUrl;
    });
    await updateUserAvatar({ id: user.user.id, avatar_path: image_url });
  };
  return { uploadNewAvatar: uploadNewAvatar };
};
