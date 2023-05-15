import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Loading from "../../components/loading";
import authAPI from "../../api/authAPI";
import userAPI from "../../api/userAPI";
import yup from "../../utils/yupGlobal";
import { useState } from "react";

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
  const handleUpdatePassword = async (data) => {
    await userAPI.updatePassword({
      currentPassword: data.password,
      password: data.newPassword,
      passwordConfirm: data.passwordConfirm,
    });
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
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
              Mật khẩu cũ
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={`${
                  errors.password ? "border-red-500" : ""
                } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-sm">{`*${errors.password.message}`}</p>}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
              Mật khẩu mới
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={` ${
                  errors.newPassword ? "border-red-500" : ""
                } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                {...register("newPassword")}
              />
              {errors.newPassword && <p className="text-red-500 text-sm">{`*${errors.newPassword.message}`}</p>}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
              Xác nhận mật khẩu mới
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={`${
                  errors.passwordConfirm ? "border-red-500" : ""
                } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 border-[1px] focus:bg-transparent focus:outline-none`}
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm ">{`*${errors.passwordConfirm.message}`}</p>
              )}
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
