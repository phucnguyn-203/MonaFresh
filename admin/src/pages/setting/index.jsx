import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PageLayout from "../../components/layout/pageLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../utils/yupGlobal";
import UpdatePassword from "./UpdatePassword";
import userAPI from "../../api/userAPI";
import authAPI from "../../api/authAPI";

export default function Setting() {
  const [avatar, setAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();
  const currentAdmin = useSelector((state) => state.auth.currentUser);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
  };
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    email: yup.string().required("Vui lòng nhập Email của bạn ").email("Vui lòng nhập đúng định dạng của Email"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại của bạn")
      .phone("Vui lòng nhập đúng định dạng số điện thoại"),
    // photo: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleUpdatePassword = async (data) => {
    try {
      await userAPI.updatePassword({
        currentPassword: data.password,
        password: data.newPassword,
        passwordConfirm: data.passwordConfirm,
      });
      await authAPI.logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateInfo = async (data) => {
    try {
      await userAPI.updateInfo({
        name: data.name,
        email: data.email,
        phone: data.phone,
        photo: data.photo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatarUpload = async () => {
    const formData = new FormData();
    formData.append("file", avatar);
    return await userAPI.updateAvatar(formData);
  };

  const onSubmit = async (data) => {
    try {
      const uploadAvatar = await handleAvatarUpload();
      const photoUrl = uploadAvatar.url;
      data.photo = photoUrl;
      console.log(data);
      await handleUpdateInfo(data);
    } catch (err) {
      console.log(err);
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
                          <polyline points="16 16 12 12 8 16"></polyline>
                          <line x1="12" y1="12" x2="12" y2="21"></line>
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                          <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>
                      </span>
                      <p className="text-sm mt-2">Tải ảnh lên tại đây</p>
                      <em className="text-xs text-gray-400">(Chỉ nhận file ảnh *.jpeg và *.png)</em>
                    </div>
                  </label>
                  <Link to={previewAvatar ? previewAvatar : currentAdmin.photo} target="page">
                    <img
                      src={previewAvatar ? previewAvatar : currentAdmin.photo}
                      className=" flex-wrap mt-4 inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mb-6">
              <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                Tên
              </label>
              <div className="col-span-8 sm:col-span-4 ">
                <input
                  type="text"
                  defaultValue={currentAdmin?.name}
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
                  defaultValue={currentAdmin?.email}
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
                  defaultValue={currentAdmin?.phone}
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
              type="submit"
              className="align-bottom inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#0E9F6E] border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 h-12 "
            >
              Cập nhật hồ sơ
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword handleUpdatePassword={handleUpdatePassword} />
    </PageLayout>
  );
}
