import React from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/utils/yupGlobal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import userAPI from "@/api/userAPI";
import Swal from "sweetalert2";
import Loading from "@/components/loading";

function Reset() {
  const router = useRouter();
  const { token } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [isExpire, setIsExpire] = useState(false);

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu cho tài khoản của bạn")
      .min(8, "Mật khẩu có độ dài tối thiểu là 8 ký tự"),
    passwordConfirm: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await userAPI.resetPassword(data, token);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Vui lòng đăng nhập lại!",
        title: "Đặt lại mật khẩu thành công",
        confirmButtonColor: "#0E9F6E",
        showConfirmButton: true,
        timer: 1500,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatus = async () => {
    try {
      await userAPI.getStatusResetPasswordToken(token);
    } catch (err) {
      setIsExpire(true);
    }
  };

  const renderExpiredLinkMessage = () => {
    Swal.fire({
      icon: "warning",
      iconColor: "#d33",
      title: "Thông báo",
      text: "Đường dẫn hết hạn hoặc đã sử dụng, vui lòng thực hiện xác nhận Email lại!",
      showConfirmButton: true,
      confirmButtonColor: "#0E9F6E",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/forget-password");
      }
    });
  };

  useEffect(() => {
    if (token) {
      getStatus();
    }
  }, [token]);
  return (
    <div className="p-8 px-9 ">
      <h2 className="text-4xl font-bold text-center  text-teal-700 uppercase mb-8">
        Đặt lại mật khẩu
      </h2>
      {isExpire ? (
        renderExpiredLinkMessage()
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg">
          <div className="flex flex-col text-teal-800 py-2">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              className={`${
                errors.password ? "border-red-500" : ""
              } p-2 placeholder:italic placeholder:text-sm rounded-lg bg-white mt-2 focus:bg-white focus:outline-none`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm italic">{`*${errors.password.message}`}</p>
            )}
          </div>
          <div className="flex flex-col text-teal-800 py-2">
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className={`${
                errors.passwordConfirm ? "border-red-500" : ""
              } p-2 placeholder:italic placeholder:text-sm rounded-lg bg-white mt-2 focus:bg-white focus:outline-none`}
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm italic">{`*${errors.passwordConfirm.message}`}</p>
            )}
          </div>
          <button
            disabled={isLoading}
            className={`w-full my-5 py-2 bg-green-300 shadow-lg rounded-lg text-teal-800 ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loading size={30} />
              </div>
            ) : (
              "Đặt lại mật khẩu"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
Reset.Layout = AuthLayout;
export default Reset;
