import React from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/utils/yupGlobal";

function Reset() {
    const schema = yup.object().shape({
        password: yup.string().required("Vui lòng nhập mật khẩu cho tài khoản của bạn"),
        cpassword: yup
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
    const onSubmit = (data) => console.log(data);
    return (
        <div className="p-8 px-9 ">
            <h2 className="text-4xl font-bold text-center  text-teal-700 uppercase mb-8">Đặt lại mật khẩu</h2>
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
                    {errors.password && <p className="text-red-500 text-sm italic">{`*${errors.password.message}`}</p>}
                </div>
                <div className="flex flex-col text-teal-800 py-2">
                    <label>Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className={`${
                            errors.cpassword ? "border-red-500" : ""
                        } p-2 placeholder:italic placeholder:text-sm rounded-lg bg-white mt-2 focus:bg-white focus:outline-none`}
                        {...register("cpassword")}
                    />
                    {errors.cpassword && (
                        <p className="text-red-500 text-sm italic">{`*${errors.cpassword.message}`}</p>
                    )}
                </div>
                <button className="w-full my-5 py-2 bg-green-300 shadow-lg rounded-lg text-teal-800">
                    Xác nhận mật khẩu
                </button>
            </form>
        </div>
    );
}
Reset.Layout = AuthLayout;
export default Reset;
