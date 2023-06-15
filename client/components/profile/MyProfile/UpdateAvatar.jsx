import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import uploadFileApi from "@/api/uploadFileApi";
import Loading from "@/components/loading";
import { setUserSuccess } from "@/features/auth/authSlice";
import Swal from "sweetalert2";
import userAPI from "@/api/userAPI";

export default function UpdateAvatar() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [avatar, setAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      if (avatar) {
        const uploadAvatar = await handleAvatarUpload();
        const photoUrl = uploadAvatar.url;
        const data = {
          ...currentUser,
          photo: photoUrl,
        };
        await userAPI.updateInfo(data);
        dispatch(setUserSuccess(data));
      }

      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        position: "top-right",
        timer: 5000,
        toast: true,
        showConfirmButton: false,
        showCloseButton: false,
        customClass: {
          container: "absolute top-[80px] right-4",
          title: "my-swal-title",
          closeButton: "my-swal-close-button",
        },
        willOpen: () => {
          document.querySelector("header").style.zIndex = 1;
        },
        willClose: () => {
          document.querySelector("header").style.zIndex = "";
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Cập nhật thất bại",
        position: "top-right",
        timer: 5000,
        toast: true,
        showConfirmButton: false,
        showCloseButton: false,
        customClass: {
          container: "absolute top-[80px] right-4",
          title: "my-swal-title",
          closeButton: "my-swal-close-button",
        },
        willOpen: () => {
          document.querySelector("header").style.zIndex = 1;
        },
        willClose: () => {
          document.querySelector("header").style.zIndex = "";
        },
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-[50px] max-w-[40%] basis-[40%] border-l-[1px] border-[#ececec] text-center items-center justify-center">
      <div className="my-[30px] justify-center px-auto flex">
        <img
          src={previewAvatar ? previewAvatar : currentUser?.photo}
          className="w-36 h-36 rounded-full"
          alt="userProfile"
          width="150"
          height="150"
        />
      </div>
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
      <div className="mt-2 mb-4">
        <div className="text-gray-400 text-[15px]">
          Kích thước: không vượt quá 1MB Phần mở rộng tệp: .JPEG, .PNG
        </div>
      </div>
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          onClick={onSubmit}
          className={`${
            isLoading ? "cursor-not-allowed" : ""
          } rounded-[8px] m-[20px] mt-1  bg-[#6abd45] text-[white] min-h-[40px] min-w-[150px] w-[20%] flex items-center text-center justify-center uppercase hover:bg-[#5faf3d]`}
        >
          {isLoading ? <Loading size={30} /> : "Cập nhật ảnh"}
        </button>
      </div>
    </div>
  );
}
