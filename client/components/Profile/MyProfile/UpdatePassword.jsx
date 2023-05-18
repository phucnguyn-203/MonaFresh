import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../utils/yupGlobal";
import styles from "../MyProfile/styles.module.css";
import userAPI from "@/api/userAPI";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

export default function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(8, "Mật khẩu có ít nhất 8 ký tự"),
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
      await userAPI.logout();
      router.push("/login");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Thay đổi mật khẩu thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Mật khẩu cũ không chính xác",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 mt-9 flex-grow w-full max-h-full ">
          <div className=" w-full h-[100px] border-b-[1px] border-[#ececec] pt-[30px] pb-[20px]">
            <div className="w-full uppercase text-[18px] font-[600]">
              Cập nhật mật khẩu
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6 pt-6">
            <label className="block  text-gray-400 dark:text-gray-400 col-span-4 sm:col-span-2  text-sm">
              Mật khẩu cũ
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={` ${errors.password ? "border-red-500" : ""} ${
                  styles.input
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm italic">{`*${errors.password.message}`}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-400 dark:text-gray-400 col-span-4 sm:col-span-2  text-sm">
              Mật khẩu mới
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={` ${errors.newPassword ? "border-red-500" : ""} ${
                  styles.input
                }`}
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm italic">{`*${errors.newPassword.message}`}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="block  text-gray-400 dark:text-gray-400 col-span-4 sm:col-span-2  text-sm">
              Xác nhận mật khẩu mới
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                type="password"
                className={`${errors.passwordConfirm ? "border-red-500" : ""} ${
                  styles.input
                }`}
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm italic ">{`*${errors.passwordConfirm.message}`}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse pr-6 pb-6">
          <button
            disabled={isLoading}
            onClick={() => handleUpdatePassword}
            className={`${
              isLoading ? "cursor-not-allowed" : ""
            } align-bottom uppercase inline-flex items-center justify-center cursor-pointer transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#6abd45] border border-transparent active:bg-green-600 hover:bg-[#5faf3d] focus:ring focus:ring-purple-300 h-12 `}
          >
            {isLoading ? <Loading size={30} /> : "Cập nhật mật khẩu"}
          </button>
        </div>
      </form>
    </div>
  );
}
