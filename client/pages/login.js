import React, { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import Link from "next/link";
import userAPI from "@/api/userAPI";
import yup from "@/utils/yupGlobal";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setUserSuccess, setUserFail } from "@/features/auth/authSlice";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập Email của bạn")
      .email("Vui lòng nhập đúng định dạng của Email"),
    password: yup.string().required("Vui lòng nhập mật khẩu của bạn"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setIsLoading(true);
      const response = await userAPI.login(email, password);
      dispatch(setUserSuccess(response.data));
      router.push("/");
    } catch (errors) {
      dispatch(setUserFail());
      setIsError(true);
      console.log(errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 px-9">
      <h2 className="text-4xl font-bold text-center text-teal-700">
        ĐĂNG NHẬP
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg">
        <div className="flex flex-col text-teal-800 py-2">
          <label>Email</label>
          <input
            type="text"
            placeholder="Monafresh@gmail.com"
            className={`${
              errors.email ? "border-red-500" : ""
            } p-2 placeholder:italic placeholder:text-sm rounded-lg bg-white mt-2 focus:bg-white focus:outline-none`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm italic">{`*${errors.email.message}`}</p>
          )}
        </div>
        <div className="flex flex-col text-teal-800 py-2">
          <label>Mật khẩu</label>
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
        <div className="flex justify-end">
          <Link
            href="/forget-password"
            className="text-sm underline italic text-teal-800 flex-start mr-0  ml-12 "
          >
            Quên mật khẩu?
          </Link>
        </div>
        <button
          disabled={isLoading}
          className={`w-full my-5 py-2 bg-green-300 shadow-lg rounded-lg  text-teal-800 ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loading size={30} />
            </div>
          ) : (
            "ĐĂNG NHẬP"
          )}
        </button>
      </form>
      <div className="flex justify-between items-center">
        <p className="text-sm italic text-teal-800">Bạn chưa có tài khoản? </p>
        <Link
          href="/register"
          className="text-sm py-1 px-8 bg-green-300 shadow-lg rounded-lg  text-teal-800"
        >
          ĐĂNG KÝ
        </Link>
      </div>
    </div>
  );
}

Login.Layout = AuthLayout;
export default Login;
