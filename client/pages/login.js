import AuthLayout from "@/components/layout/AuthLayout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/utils/yupGlobal";

function Login() {
    const schema = yup.object().shape({
        email: yup.string().required("Vui lòng nhập Email của bạn").email("Vui lòng nhập đúng định dạng của Email"),
        password: yup.string().required("Vui lòng nhập mật khẩu của bạn"),
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
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] w-full mx-auto rounded-lg  p-8 px-9 ">
            <h2 className="text-4xl dark:text-white font-bold text-center font-serif text-teal-700">ĐĂNG NHẬP</h2>
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
                {errors.email && <p className="text-red-500 text-sm italic">{`*${errors.email.message}`}</p>}
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
                {errors.password && <p className="text-red-500 text-sm italic">{`*${errors.password.message}`}</p>}
            </div>
            <div className="justify-between flex">
                <div>
                    <p className="text-sm italic flex items-center text-teal-800">
                        <input type="checkbox" className="mr-2 " />
                        Ghi nhớ đăng nhập
                    </p>
                </div>
                <a href="#" className="text-sm underline italic text-teal-800 flex-start mr-0  ml-12 ">
                    Quên mật khẩu?
                </a>
            </div>
            <button className="w-full my-5 py-2 bg-green-300 shadow-lg rounded-lg font-serif text-teal-800">
                ĐĂNG NHẬP
            </button>
            <div className="justify-between flex">
                <p className="text-sm italic flex items-center text-teal-800">Bạn chưa có tài khoản? </p>
                <button className="w-32 text-sm  py-1 bg-green-300 shadow-lg rounded-lg font-serif text-teal-800">
                    <Link href="/signUp">ĐĂNG KÝ</Link>
                </button>
            </div>
        </form>
    );
}

Login.Layout = AuthLayout;
export default Login;
