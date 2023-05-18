import styles from "./styles.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import uploadFileApi from "@/api/uploadFileApi";

export default function UpdateAvatar() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [avatar, setAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };
  const handleAvatarUpload = async () => {
    const formData = new FormData();
    formData.append("file", avatar);
    return await uploadFileApi.uploadSingleFile(formData);
  };
  const handleSubmit = async (data) => {
    const uploadAvatar = await handleAvatarUpload();
    const photoUrl = uploadAvatar.url;
    data.photo = photoUrl;
  };
  return (
    <div className="px-[50px] max-w-[40%] basis-[40%] border-l-[1px] border-[#ececec] text-center items-center justify-center">
      <div className="my-[30px] justify-center px-auto flex">
        <Image
          src={previewAvatar ? previewAvatar : currentUser.photo}
          className="rounded-full w-36 h-36"
          alt="userProfile"
          width="150"
          height="150"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-[30px] justify-center px-auto flex">
          <label
            htmlFor="chooseImg"
            className="rounded-[8px] border-[1px] bg-[white] text-[15px] min-w-[90px] w-[10%] min-h-[30px] flex items-center text-center justify-center hover:bg-gray-50"
          >
            Chọn ảnh
          </label>
          <input
            id="chooseImg"
            hidden
            accept="image/*"
            className="w-full border-[1px] border-solid outline-none"
            type="file"
            onChange={handlePreviewAvatar}
          />
        </div>
        <div className="my-[20px]">
          <div className="text-gray-400 text-[15px]">
            Kích thước: không vượt quá 1MB Phần mở rộng tệp: .JPEG, .PNG
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            type="submit"
            className="rounded-[8px] m-[20px] bg-[#6abd45] text-[white] min-h-[40px] min-w-[150px] w-[20%] flex items-center text-center justify-center uppercase hover:bg-[#5faf3d]"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
