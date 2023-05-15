import styles from "./styles.module.css";
import login from "../../assets/img/login-office.c7786a89.jpeg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../utils/yupGlobal";
import userAPI from "../../api/userAPI";
import Swal from "sweetalert2";
import Loading from "../../components/loading";
import { useState } from "react";

export default function ForgotPassword() {
  const schema = yup.object().shape({
    email: yup.string().required("Vui lòng nhập Email của bạn ").email("Vui lòng nhập đúng định dạng của Email"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await userAPI.forgotPassword(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Xác nhận Email thành công",
        text: "Vui lòng kiểm tra Email!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Email không tồn tại, vui lòng nhập lại!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className="w-1/2  ">
          <img src={login} alt="login.jpeg" className="w-full h-full object-cover inline-block" />
        </div>
        <div className="w-1/2 p-12 ">
          <div className="h-full pt-20">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Khôi phục mật khẩu</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="email" className=" py-3 block text-sm text-gray-700">
                  Email xác nhận tài khoản
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

              <button
                disabled={isLoading}
                className={`${
                  isLoading ? "cursor-not-allowed" : ""
                } w-full bg-primary text-white text-sm py-4 rounded-md`}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Loading size={30} />
                  </div>
                ) : (
                  "Xác nhận email"
                )}
              </button>

              <hr className="my-10" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
