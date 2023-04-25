import styles from "./styles.module.css";
import login from "../../assets/img/login-office.c7786a89.jpeg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../utils/yupGlobal";

export default function Login() {
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
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className="w-1/2  ">
                    <img src={login} alt="login.jpeg" className="w-full h-full object-cover inline-block" />
                </div>
                <div className="w-1/2 p-12 ">
                    <div className="h-full pt-20">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Đặt lại mật khẩu</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <label htmlFor="newPassword" className=" py-3 block text-sm text-gray-700">
                                    Mật khẩu mới
                                </label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    className={`${
                                        errors.password ? "border-red-500" : ""
                                    } block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent`}
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{`*${errors.password.message}`}</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="passwordConfirm" className=" py-3 block text-sm text-gray-700">
                                    Nhập lại mật khẩu mới
                                </label>
                                <input
                                    id="passwordConfirm"
                                    type="password"
                                    className={`${
                                        errors.cpassword ? "border-red-500" : ""
                                    } block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent`}
                                    {...register("cpassword")}
                                />
                                {errors.cpassword && (
                                    <p className="text-red-500 text-sm">{`*${errors.cpassword.message}`}</p>
                                )}
                            </div>
                            <button className="w-full bg-primary text-white text-sm py-4 rounded-md">
                                Đặt lại mật khẩu
                            </button>

                            <hr className="my-10" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
