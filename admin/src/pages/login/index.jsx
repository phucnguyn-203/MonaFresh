import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../components/loading";
import yup from "../../utils/yupGlobal";
import styles from "./styles.module.css";
import loginImg from "../../assets/img/login-office.c7786a89.jpeg";
import authAPI from "../../api/authAPI.js";
import { setUserSuccess, setUserFail } from "../../features/auth/authSlice";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập Email của bạn ").email("Vui lòng nhập đúng định dạng của Email"),
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
            const response = await authAPI.login(email, password);
            dispatch(setUserSuccess(response.data));
            navigate("/", { replace: true });
        } catch {
            dispatch(setUserFail());
            setIsError(true);
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className="w-1/2">
                    <img src={loginImg} alt="login.jpeg" className="w-full h-full object-cover inline-block" />
                </div>
                <div className="w-1/2 p-12">
                    <div className="h-full">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Đăng Nhập</h1>
                        {isError && (
                            <div className="my-4 py-3 px-4 bg-red-100 border-[1px] border-[#ff424f33]">
                                <p className="text-[#222222]">
                                    Đăng nhập không thành công Email hoặc mật khẩu không đúng
                                </p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="admin@gmail.com"
                                    className={`${
                                        errors.email ? "border-red-500" : ""
                                    } block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent`}
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{`*${errors.email.message}`}</p>}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm text-gray-700">
                                    Mật Khẩu
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    className={`${
                                        errors.password ? "border-red-500" : ""
                                    } block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent`}
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{`*${errors.password.message}`}</p>
                                )}
                            </div>
                            <button
                                disabled={isLoading}
                                className={`${
                                    isLoading ? "cursor-not-allowed" : ""
                                } w-full bg-primary text-white text-sm py-4 rounded-md`}
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <Loading width={30} height={30} />
                                    </div>
                                ) : (
                                    "Đăng nhập"
                                )}
                            </button>
                            <div className=" flex pt-5 justify-start pl-2 items-center w-full h-full">
                                <Link to="/forget-password" className="underline text-sm text-primary">
                                    Quên mật khẩu?
                                </Link>
                            </div>

                            <hr className="my-10" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
