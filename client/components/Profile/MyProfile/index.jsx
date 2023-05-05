import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Avatar from "@/public/assets/img/avatar.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/utils/yupGlobal";
import UpdatePassword from "./UpdatePassword";

export default function MyProfile() {
  const [img, setImg] = useState(Avatar);

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    email: yup
      .string()
      .required("Vui lòng nhập Email của bạn")
      .email("Vui lòng nhập đúng định dạng của Email"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại của bạn")
      .phone("Vui lòng nhập đúng số điện thoại của bạn"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu hiện tại cho tài khoản của bạn"),
    newPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới cho tài khoản của bạn"),
    cNewPassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu mới cho tài khoản của bạn")
      .oneOf([yup.ref("newPassword")], "Mật khẩu không trùng khớp"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  const handleSetImg = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setImg(file);
  };
  console.log(img);
  return (
    <div className="w-full h-full px-[30px]  ">
      <div className="bg-white px-[20px] rounded-[8px]">
        <div className=" w-full h-[100px] border-b-[1px] border-[#ececec] pt-[30px] pb-[20px]">
          <div className="w-full uppercase text-[18px] font-[600]">
            Thông tin tài khoản
          </div>
          <div className="w-full text-[15px] font-[300]">
            Quản lý và bảo vệ tài khoản của bạn
          </div>
        </div>
        <div className="flex w-full py-[30px]">
          <div className="max-w-[60%] basis-[60%] pr-[20px text-gray-400">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
                <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                  Họ và Tên
                </div>
                <div className="max-w-[70%] basis-[70%] text-left">
                  <input
                    className={`${errors.name ? "border-red-500" : ""} ${
                      styles.input
                    }`}
                    id="name"
                    type="text"
                    name="name"
                    // defaultValue="Nguyễn Hoàng Phúc"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm italic">{`*${errors.name.message}`}</p>
                  )}
                </div>
              </div>
              <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
                <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                  Email
                </div>
                <div className="max-w-[70%] basis-[70%] text-left">
                  <input
                    className={`${errors.email ? "border-red-500" : ""} ${
                      styles.input
                    }`}
                    id="email"
                    type="text"
                    name="email"
                    // defaultValue="phuttocdai123@gmail.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm italic">{`*${errors.email.message}`}</p>
                  )}
                </div>
              </div>
              <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
                <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                  Số điện thoại
                </div>
                <div className="max-w-[70%] basis-[70%] text-left">
                  <input
                    className={`${errors.phone ? "border-red-500" : ""} ${
                      styles.input
                    }`}
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    // defaultValue="0123456789"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm italic">{`*${errors.phone.message}`}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button className="rounded-[8px] m-[20px] mt-[85px] bg-[#6abd45] text-[white] min-h-[40px] min-w-[150px] w-[20%] flex items-center text-center justify-center uppercase hover:bg-[#5faf3d]">
                  Lưu chỉnh sửa
                </button>
              </div>
            </form>
          </div>

          <div className="px-[50px] max-w-[40%] basis-[40%] border-l-[1px] border-[#ececec] text-center items-center justify-center">
            <div className="my-[30px] justify-center px-auto flex">
              <Image
                src={img.preview ?? Avatar}
                // w-[65%] min-w-[30px] h-auto min-h-[30px]
                className="w-[120px] h-[120px] drop-shadow-xl rounded-full"
                alt="userProfile"
                width="150"
                height="150"
              />
            </div>
            <div className="my-[30px] justify-center px-auto flex">
              <label
                htmlFor="chooseImg"
                className="rounded-[8px] border-[1px] bg-[white] text-[15px] min-w-[90px] w-[10%] min-h-[30px] flex items-center text-center justify-center hover:bg-gray-50"
              >
                Chọn ảnh
              </label>
              <input
                id="chooseImg"
                hidden
                accept="image/*"
                className="w-full border-[1px] border-solid outline-none"
                type="file"
                onChange={handleSetImg}
              />
            </div>
            <div className="my-[20px]">
              <div className="text-gray-400 text-[15px]">
                Kích thước: không vượt quá 1MB Phần mở rộng tệp: .JPEG, .PNG
              </div>
            </div>
            <div className="flex justify-center ">
              <button className="rounded-[8px] m-[20px] bg-[#6abd45] text-[white] min-h-[40px] min-w-[150px] w-[20%] flex items-center text-center justify-center uppercase hover:bg-[#5faf3d]">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Cập nhật mất khẩu */}
      <UpdatePassword />
    </div>
  );
}
