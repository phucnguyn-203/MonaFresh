import styles from "./styles.module.css";
import login from "../../assets/img/login-office.c7786a89.jpeg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../utils/yupGlobal";

export default function Login() {
  const schema = yup.object().shape({
    email: yup.string().required("Required").email("Email invalid"),
    password: yup.string().required("Required").password("Password invalid"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit = (data) => console.log(data);
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className="w-1/2">
          <img
            src={login}
            alt="login.jpeg"
            className="w-full h-full object-cover inline-block"
          />
        </div>
        <div className="w-1/2 p-12">
          <div className="h-full">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
              Đăng Nhập
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  className="block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-700">
                  Mật Khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
              <button className="w-full bg-primary text-white text-sm py-4 rounded-md">
                Đăng Nhập
              </button>
              <hr className="my-10" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
