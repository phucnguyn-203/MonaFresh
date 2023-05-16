import styles from "./styles.module.css";
import login from "../../assets/img/login-office.c7786a89.jpeg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../utils/yupGlobal";
import userAPI from "../../api/userAPI";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading";

export default function ResetPassword() {
  const param = useParams();
  const navigate = useNavigate();
  const [isExpire, setIsExpire] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      await userAPI.resetPassword(data, param.resetToken);
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
          navigate("/login");
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
      await userAPI.getStatusResetPasswordToken(param.resetToken);
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
        navigate("/forget-password");
      }
    });
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className={styles.layout}>
      {isExpire ? (
        renderExpiredLinkMessage()
      ) : (
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
                  {errors.password && <p className="text-red-500 text-sm">{`*${errors.password.message}`}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="passwordConfirm" className=" py-3 block text-sm text-gray-700">
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    id="passwordConfirm"
                    type="password"
                    className={`${
                      errors.passwordConfirm ? "border-red-500" : ""
                    } block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent`}
                    {...register("passwordConfirm")}
                  />
                  {errors.passwordConfirm && (
                    <p className="text-red-500 text-sm">{`*${errors.passwordConfirm.message}`}</p>
                  )}
                </div>
                <button className="w-full bg-primary text-white text-sm py-4 rounded-md">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loading size={30} />
                    </div>
                  ) : (
                    "Đặt lại mật khẩu"
                  )}
                </button>

                <hr className="my-10" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
