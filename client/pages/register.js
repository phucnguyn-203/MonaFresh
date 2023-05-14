import AuthLayout from "@/components/layout/AuthLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/utils/yupGlobal";
import Link from "next/link";
import { data } from "autoprefixer";
import UserAPI from "../api/userAPI";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const CreateUser = async (data) => {
    const { name, email, phone, password, passwordConfirm } = data;
    await UserAPI.signUp({
      name,
      email,
      phone,
      password,
      passwordConfirm,
    });
  };

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng cung cấp họ tên của bạn"),
    email: yup
      .string()
      .required("Vui lòng cung cấp địa chỉ email")
      .email("Vui lòng nhập đúng định dạng email"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .phone("Vui lòng nhập đúng định dạng số điện thoại"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu cho tài khoản của bạn")
      .min(8, "Vui lòng nhập tối thiểu 8 ký tự"),
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
      await CreateUser(data);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Đăng ký thành công!",
        // showConfirmButton: false,
        timer: 1500,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Email hoặc số điện thoại đã tồn tại.",
        text: "Vui lòng nhập lại!",
      });
      console.log(err);
    }
  };
  return (
    <div className="p-8 px-9 ">
      <h2 className="text-4xl font-bold text-center  text-teal-700">ĐĂNG KÝ</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg">
        <div className="flex flex-col text-teal-800 py-2">
          <label>Họ và tên</label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            className={`${
              errors.name ? "border-red-500 " : ""
            } p-2 placeholder:italic placeholder:text-sm rounded-lg  bg-white mt-2 focus:bg-white focus:outline-none`}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm italic">{`*${errors.name.message}`}</p>
          )}
        </div>
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
          <label>Số điện thoại</label>
          <input
            type="text"
            placeholder="0123456789"
            className={`${
              errors.phone ? "border-red-500" : ""
            } p-2 placeholder:italic placeholder:text-sm rounded-lg bg-white mt-2 focus:bg-white focus:outline-none`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm italic">{`*${errors.phone.message}`}</p>
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
        <button className="w-full my-5 py-2 bg-green-300 shadow-lg rounded-lg text-teal-800">
          ĐĂNG KÝ TÀI KHOẢN
        </button>
      </form>
      <p className="text-sm italic text-teal-800">
        Bạn đã có tài khoản?{" "}
        <span>
          {" "}
          <Link href="/login" className="underline">
            Đăng nhập
          </Link>
        </span>
      </p>
    </div>
  );
}
Register.Layout = AuthLayout;
export default Register;
