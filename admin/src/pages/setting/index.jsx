import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { setUserSuccess } from "../../features/auth/authSlice";
import Loading from "../../components/loading";
import PageLayout from "../../components/layout/pageLayout";
import yup from "../../utils/yupGlobal";
import userAPI from "../../api/userAPI";
import uploadFileApi from "../../api/uploadFileApi";
import UpdatePassword from "./UpdatePassword";

export default function Setting() {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    email: yup.string().required("Vui lòng nhập Email của bạn ").email("Vui lòng nhập đúng định dạng của Email"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại của bạn")
      .phone("Vui lòng nhập đúng định dạng số điện thoại"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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

  const handleUpdateInfo = async (data) => {
    return await userAPI.updateInfo(data);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (avatar) {
        const uploadAvatar = await handleAvatarUpload();
        const photoUrl = uploadAvatar.url;
        data.photo = photoUrl;
      }
      const response = await handleUpdateInfo(data);
      dispatch(setUserSuccess(response.data));
      toast.success("Cập nhật thành công", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error("Cập nhật thất bại, email hoặc số điện thoại đã tồn tại", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout title="Cài đặt">
      <div className="bg-white rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow w-full max-h-full ">
            <div className="grid grid-cols-6 gap-3 mb-6">
              <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                Ảnh đại diện
              </label>
              <div className="col-span-8 sm:col-span-4 ">
                <div className="w-full text-center">
                  <input type="file" hidden id="file" accept="image/*" onChange={handlePreviewAvatar} />
                  <label htmlFor="file">
                    <div className="px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                      <span className="mx-auto flex justify-center">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-3xl text-green-500"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="16 16 12 12 8 16"></polyline> <line x1="12" y1="12" x2="12" y2="21"></line>
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                          <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>
                      </span>
                      <p className="text-sm mt-2">Tải ảnh lên tại đây</p>
                      <em className="text-xs text-gray-400">(Chỉ nhận file ảnh *.jpeg và *.png)</em>
                    </div>
                  </label>
                </div>
                <Link
                  to={previewAvatar ? previewAvatar : currentUser.photo}
                  target="_blank"
                  className="inline-block mt-5"
                >
                  <div className="w-[150px] h-[150px] border rounded-md border-gray-100 p-2">
                    <img
                      src={previewAvatar ? previewAvatar : currentUser.photo}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mb-6">
              <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                Tên
              </label>
              <div className="col-span-8 sm:col-span-4 ">
                <input
                  type="text"
                  defaultValue={currentUser?.name}
                  className={`${
                    errors.name ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm">{`*${errors.name.message}`}</p>}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mb-6">
              <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                Email
              </label>
              <div className="col-span-8 sm:col-span-4 ">
                <input
                  type="text"
                  defaultValue={currentUser?.email}
                  className={`${
                    errors.email ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm">{`*${errors.email.message}`}</p>}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mb-6">
              <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                Số điện thoại
              </label>
              <div className="col-span-8 sm:col-span-4 ">
                <input
                  type="text"
                  defaultValue={currentUser?.phone}
                  className={`${
                    errors.phone ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("phone")}
                />
                {errors.phone && <p className="text-red-500 text-sm">{`*${errors.phone.message}`}</p>}
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse pr-6 pb-6">
            <button
              disabled={isLoading}
              type="submit"
              className={`${
                isLoading ? "cursor-not-allowed" : ""
              } align-bottom inline-flex items-center justify-center transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#0E9F6E] border border-transparent active:bg-green-600 hover:bg-green-600 h-12`}
            >
              {isLoading ? <Loading size={30} /> : "Cập nhật hồ sơ"}
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword />
    </PageLayout>
  );
}
