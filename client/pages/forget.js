import React from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/utils/yupGlobal";

function Forget() {
    const schema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập Email của bạn").email("Vui lòng nhập đúng định dạng của Email"),
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
        <div className="p-8 px-9">
            <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">QUÊN MẬT KHẨU</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg">
                <div className="flex flex-col text-teal-800 py-2">
                    <label className="pb-3">Email đăng ký</label>
                    <input
                        type="text"
                        placeholder="Monafresh@gmail.com"
                        className={`${
                            errors.email ? "border-red-500" : ""
                        } p-2 placeholder:italic placeholder:text-sm rounded-lg bg-white mt-2 focus:bg-white focus:outline-none`}
                        {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm italic">{`*${errors.email.message}`}</p>}
                </div>

                <button className="w-full my-5 py-2 bg-green-300 shadow-lg rounded-lg  text-teal-800">
                    Lấy lại mật khẩu
                </button>
            </form>
        </div>
    );
}
Forget.Layout = AuthLayout;
export default Forget;
