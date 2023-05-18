import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { IconUploadFile, IconEye, IconEyeClose } from "../../icon";
import { useForm } from "react-hook-form";
import yup from "../../../utils/yupGlobal";
import staffAPI from "../../../api/staffAPI";
import toastMessage from "../../../utils/toastMessage";
import styles from "./styles.module.css";

export default function AddModalStaff({ closeModal, title, titleBtnFooter, handleAddStaff }) {
  const [photo, setPhoto] = useState();
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    email: yup.string().required("Vui lòng nhập Email của bạn.").email("Vui lòng nhập đúng định dạng của Email."),
    password: yup.string().required("Vui lòng nhập mật khẩu của bạn.").min(8, "Mật khẩu có ít nhất 8 kí tự."),
    passwordConfirm: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu của bạn.")
      .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp."),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại của bạn.")
      .phone("Vui lòng nhập đúng định dạng số điện thoại."),
    role: yup.string().required("Vui lòng nhập chức vụ."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    setPreviewPhoto(URL.createObjectURL(file));
  };
  const handleAvatarUpload = async () => {
    const formData = new FormData();
    formData.append("file", photo);
    return await staffAPI.uploadAvatar(formData);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onSubmit = async (data) => {
    try {
      const uploadAvatar = await handleAvatarUpload();
      data.photo = uploadAvatar.url;
      handleAddStaff(data);
      toastMessage({ type: "success", message: "Cập nhật thành công." });
    } catch (error) {
      toastMessage({ type: "error", message: `Cập nhật thất bại. ${error}.` });
    }
  };
  return (
    <div>
      <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
      <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter}>
        <ModalHeader closeModal={closeModal} title={title} />
        <div className="h-full overflow-y-scroll grow mt-[20px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex px-[25px] my-[20px]">
              <label className="w-1/3 mr-[75px] text-sm text-gray-700 font-medium dark:text-gray-400">
                Ảnh nhân viên
              </label>
              <div className="w-full text-center pl-[70px]">
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  className="w-full border-[1px] border-solid h-[140px] outline-none rounded-md hidden"
                  onChange={handlePhotoChange}
                />
                <label htmlFor="file" className="">
                  <div className="px-6 pt-5 pb-6 border-[1px] border-gray-300 border-dashed rounded-md cursor-pointer flex flex-col items-center">
                    <span>
                      <IconUploadFile />
                    </span>
                    <p>Thêm ảnh tại đây</p>
                    <em>(Chỉ nhận ảnh có đuôi *.jpeg and *.png)</em>
                  </div>
                </label>
                <div>
                  {/* preview ảnh */}
                  {photo && (
                    <img
                      src={previewPhoto}
                      alt="preview"
                      className=" flex-wrap mt-4 inline-flex border rounded-md border-gray-100 w-24 max-h-24 p-2"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Tên</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <input
                  type="text"
                  placeholder="Nhập tên"
                  className={`  ${
                    errors.name ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm">{`*${errors.name.message}`}</p>}
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Email</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <input
                  type="email"
                  placeholder="Nhập email"
                  className={`${
                    errors.email ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm">{`*${errors.email.message}`}</p>}
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Mật khẩu</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <div className="flex items-center justify-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    spellcheck="false"
                    className={`${
                      errors.password ? "border-red-500" : ""
                    }  block w-11/12 px-3 py-1 text-sm h-12 border-r-0 rounded-l bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none pr-[10px]`}
                    {...register("password")}
                  />
                  <div className="bg-gray-100 w-1/12 h-[48px] flex items-center justify-center rounded-r border-[1px] border-l-0">
                    {showPassword ? (
                      <button
                        type="button"
                        className="w-[20px] h-[20px] mx-[10px] bg-gray-100"
                        onClick={handleShowPassword}
                      >
                        {<IconEye />}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-[20px] h-[20px] mx-[10px] bg-gray-100"
                        onClick={handleShowPassword}
                      >
                        {<IconEyeClose />}
                      </button>
                    )}
                  </div>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{`*${errors.password.message}`}</p>}
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Nhập lại mật khẩu</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <div className="flex items-center justify-center">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    spellcheck="false"
                    className={`${
                      errors.passwordConfirm ? "border-red-500" : ""
                    }  block w-11/12 px-3 py-1 text-sm h-12 border-r-0 rounded-l bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none pr-[10px]`}
                    {...register("passwordConfirm")}
                  />
                  <div className="bg-gray-100 w-1/12 h-[48px] flex items-center justify-center rounded-r border-[1px] border-l-0">
                    {showPasswordConfirm ? (
                      <button
                        type="button"
                        className="w-[20px] h-[20px] mx-[10px] bg-gray-100"
                        onClick={handleShowPasswordConfirm}
                      >
                        {<IconEye />}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-[20px] h-[20px] mx-[10px] bg-gray-100"
                        onClick={handleShowPasswordConfirm}
                      >
                        {<IconEyeClose />}
                      </button>
                    )}
                  </div>
                </div>
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm">{`*${errors.passwordConfirm.message}`}</p>
                )}
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>SĐT</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <input
                  type="tel"
                  placeholder="Nhập SĐT"
                  className={`${
                    errors.phone ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("phone")}
                />
                {errors.phone && <p className="text-red-500 text-sm">{`*${errors.phone.message}`}</p>}
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Chức vụ</label>
              </div>
              <div className="flex flex-col w-2/3 ">
                <select
                  {...register("role")}
                  className="block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none"
                >
                  <option value={3}>Nhân viên</option>
                  <option value={1}>Quản lý</option>
                </select>
              </div>
            </div>
            <input type="submit" hidden id="send" />
          </form>
        </div>
        <ModalFooter title={titleBtnFooter} />
      </Drawer>
    </div>
  );
}
