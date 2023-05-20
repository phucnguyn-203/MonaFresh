import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { IconUploadFile, IconEye, IconEyeClose } from "../../icon";
import styles from "./styles.module.css";
import yup from "../../../utils/yupGlobal";
import staffAPI from "../../../api/staffAPI";
import toastMessage from "../../../utils/toastMessage";

export default function EditModalStaff({ closeModal, title, titleBtnFooter, staff, handleUpdateStaff }) {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên của bạn."),
    email: yup.string().required("Vui lòng nhập Email của bạn.").email("Vui lòng nhập đúng định dạng của Email."),
    password: yup.mixed().test("password", "Mật khẩu phải có ít nhất 8 ký tự", function (value) {
      if (!value) return true;
      return value.length >= 8;
    }),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Mật khẩu không trùng khớp."),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại của bạn.")
      .phone("Vui lòng nhập đúng định dạng số điện thoại."),
    role: yup.string().required("Vui lòng chọn chức vụ."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [photo, setPhoto] = useState();
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    setPreviewPhoto(URL.createObjectURL(file));
  };
  const handlePhotoUpload = async () => {
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
      setIsLoading(true);
      if (photo) {
        const uploadAvatar = await handlePhotoUpload();
        console.log(uploadAvatar);
        data.photo = uploadAvatar.url;
      }
      await handleUpdateStaff(staff._id, data);
      toastMessage({ type: "success", message: "Cập nhật thành công." });
    } catch (error) {
      toastMessage({ type: "error", message: `Cập nhật thất bại. ${error}.` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
      <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter}>
        <ModalHeader closeModal={closeModal} title={title} />
        <div className="h-full overflow-y-scroll grow mt-[20px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex items-start px-[25px] my-[20px]">
              <label className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">Ảnh nhân viên</label>
              <input
                id="file"
                type="file"
                accept="image/*"
                className="w-full border-[1px] border-solid h-[140px] outline-none rounded-md hidden"
                onChange={handlePhotoChange}
              />
              <div className="flex flex-col w-full pl-[130px]">
                <label htmlFor="file" className="grow">
                  <div className="px-6 pt-5 pb-6 border-[1px] border-gray-300 border-dashed rounded-md cursor-pointer flex flex-col items-center">
                    <span>
                      <IconUploadFile />
                    </span>

                    <p>Thêm ảnh tại đây</p>
                    <em>(Chỉ nhận ảnh có đuôi *.jpeg and *.png )</em>
                  </div>
                </label>
                <Link
                  to={photo ? URL.createObjectURL(photo) : staff.photo}
                  target="_blank"
                  className="inline-block mt-5"
                >
                  <div className="w-[150px] h-[150px] border rounded-md border-gray-100 p-2">
                    <img
                      src={photo ? URL.createObjectURL(photo) : staff.photo}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Tên</label>
              </div>
              <div className="flex flex-col w-2/3">
                <input
                  defaultValue={staff.name}
                  type="text"
                  placeholder="Nhập tên"
                  className={`${
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
              <div className="flex flex-col w-2/3">
                <input
                  defaultValue={staff.email}
                  type="email"
                  placeholder="Nhập email"
                  className={`${
                    errors.email ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-5 border-[1px] focus:bg-transparent focus:outline-none`}
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
                <div className="flex items-center justify-center relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    spellcheck="false"
                    className={`${
                      errors.password ? "border-red-500" : ""
                    }  block w-full px-3 py-1 text-sm h-12 border-r-0 rounded-l bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none pr-[10px]`}
                    {...register("password")}
                  />
                  <div className="absolute right-0 bg-transparent w-1/12 h-[48px] flex items-center justify-center rounded-r border-0">
                    {showPassword ? (
                      <button type="button" className="w-[20px] h-[20px] mx-[10px] " onClick={handleShowPassword}>
                        {<IconEye />}
                      </button>
                    ) : (
                      <button type="button" className="w-[20px] h-[20px] mx-[10px] " onClick={handleShowPassword}>
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
                <div className="flex items-center justify-center relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    spellcheck="false"
                    className={`${
                      errors.password ? "border-red-500" : ""
                    } block w-full px-3 py-1 text-sm h-12 border-r-0 rounded-l bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none pr-[10px]`}
                    {...register("passwordConfirm")}
                  />
                  <div className="absolute right-0 bg-transparent w-1/12 h-[48px] flex items-center justify-center rounded-r border-0">
                    {showPasswordConfirm ? (
                      <button
                        type="button"
                        className="w-[20px] h-[20px] mx-[10px] "
                        onClick={handleShowPasswordConfirm}
                      >
                        {<IconEye />}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-[20px] h-[20px] mx-[10px] "
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
              <div className="flex flex-col w-2/3">
                <input
                  defaultValue={staff.phone}
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
              <div className="flex flex-col w-2/3">
                <select
                  defaultValue={staff.role}
                  className="block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none"
                  {...register("role")}
                >
                  <option value={3}>Nhân viên</option>
                  <option value={1}>Quản lý</option>
                </select>
              </div>
            </div>
            <input type="submit" hidden id="send" disabled={isLoading} />
          </form>
        </div>
        <ModalFooter title={titleBtnFooter} isLoading={isLoading} />
      </Drawer>
    </>
  );
}
