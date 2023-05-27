import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Loading from "../../components/loading";
import authAPI from "../../api/authAPI";
import userAPI from "../../api/userAPI";
import yup from "../../utils/yupGlobal";
import { useState } from "react";
import { IconEye, IconEyeClose } from "../../components/icon";
import styles from "./styles.module.css";

export default function UpdatePassword() {
  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
    passwordConfirm: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu mới")
      .oneOf([yup.ref("newPassword")], "Mật khẩu không trùng khớp"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleUpdatePassword = async (data) => {
    await userAPI.updatePassword({
      currentPassword: data.password,
      password: data.newPassword,
      passwordConfirm: data.passwordConfirm,
    });
  };
  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
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
      await handleUpdatePassword(data);
      await authAPI.logout();
      navigate("/login");
      toast.success("Cập nhật mật khẩu thành công. Bạn sẽ được đưa về trang đăng nhập", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch {
      toast.error("Cập nhật thất bại. Mật khẩu hiện tại không đúng", {
        position: "top-right",
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
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 mt-9 flex-grow w-full max-h-full ">
          <div className={`${styles.item}`}>
            <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
              <label>Mật khẩu hiện tại</label>
            </div>
            <div className="flex flex-col w-2/3 ">
              <div className="flex items-center justify-center relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu hiện tại"
                  spellCheck="false"
                  className={`${
                    errors.password ? "border-red-500" : ""
                  }  block w-full px-3 py-1 text-sm h-12 rounded-l bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none pr-[10px]`}
                  {...register("password")}
                />
                <div className="absolute right-0 bg-transparent w-1/12 h-[48px] flex items-center justify-center rounded-r border-0">
                  {showCurrentPassword ? (
                    <button
                      type="button"
                      className="w-[20px] h-[20px] mx-[10px] bg-gray-100"
                      onClick={handleShowCurrentPassword}
                    >
                      {<IconEye />}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-[20px] h-[20px] mx-[10px] bg-gray-100"
                      onClick={handleShowCurrentPassword}
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
              <label>Mật khẩu mới</label>
            </div>
            <div className="flex flex-col w-2/3 ">
              <div className="flex items-center justify-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  spellCheck="false"
                  className={`${
                    errors.newPassword ? "border-red-500" : ""
                  }  block w-full px-3 py-1 text-sm h-12 rounded-l bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none pr-[10px]`}
                  {...register("newPassword")}
                />
                <div className="absolute right-0 bg-transparent w-1/12 h-[48px] flex items-center justify-center rounded-r border-0">
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
              {errors.newPassword && <p className="text-red-500 text-sm">{`*${errors.newPassword.message}`}</p>}
            </div>
          </div>
          <div className={`${styles.item}`}>
            <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
              <label>Nhập lại mật khẩu mới</label>
            </div>
            <div className="flex flex-col w-2/3 ">
              <div className="flex items-center justify-center relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới"
                  spellCheck="false"
                  className={`${
                    errors.passwordConfirm ? "border-red-500" : ""
                  }  block w-full px-3 py-1 text-sm h-12 rounded-l bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none pr-[10px]`}
                  {...register("passwordConfirm")}
                />
                <div className="absolute right-0 bg-transparent w-1/12 h-[48px] flex items-center justify-center rounded-r border-0">
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
              {errors.passwordConfirm && <p className="text-red-500 text-sm">{`*${errors.passwordConfirm.message}`}</p>}
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse pr-6 pb-6">
          <button
            disabled={isLoading}
            onClick={() => handleUpdatePassword}
            type="submit"
            className={`${
              isLoading ? "cursor-not-allowed" : ""
            } align-bottom inline-flex items-center justify-center transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#0E9F6E] border border-transparent active:bg-green-600 hover:bg-green-600 h-12 `}
          >
            {isLoading ? <Loading size={30} /> : "Cập nhật mật khẩu"}
          </button>
        </div>
      </form>
    </div>
  );
}
