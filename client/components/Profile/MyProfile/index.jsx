import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Avatar from "@/public/assets/img/avatar.png";

export default function MyProfile() {
  const [img, setImg] = useState(Avatar);

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
            <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
              <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                Họ và Tên
              </div>
              <div className="max-w-[70%] basis-[70%] text-left">
                <input
                  className={styles.input}
                  id="name"
                  type="text"
                  name="name"
                  defaultValue="Nguyễn Hoàng Phúc"
                />
              </div>
            </div>
            <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
              <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                Email
              </div>
              <div className="max-w-[70%] basis-[70%] text-left">
                <input
                  className={styles.input}
                  id="name"
                  type="text"
                  name="name"
                  defaultValue="phuttocdai123@gmail.com"
                />
              </div>
            </div>
            <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
              <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                Số điện thoại
              </div>
              <div className="max-w-[70%] basis-[70%] text-left">
                <input
                  className={styles.input}
                  id="name"
                  type="text"
                  name="name"
                  defaultValue="0123456789"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="rounded-[8px] m-[20px] mt-[85px] bg-[#6abd45] text-[white] min-h-[40px] min-w-[150px] w-[20%] flex items-center text-center justify-center uppercase hover:bg-[#5faf3d]">
                Lưu chỉnh sửa
              </button>
            </div>
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
      <div className="bg-white px-[20px] rounded-[8px] mt-[20px]">
        <div className=" w-full h-[100px] border-b-[1px] border-[#ececec] pt-[30px] pb-[20px]">
          <div className="w-full uppercase text-[18px] font-[600]">
            Cập nhật mật khẩu
          </div>
          <div className="w-full text-[15px] font-[300]">
            Quản lý mật khẩu của bạn
          </div>
        </div>
        <div className="flex w-full py-[30px]">
          <div className="flex-1 pr-[20px text-gray-400">
            <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
              <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                Mật khẩu cũ
              </div>
              <div className="max-w-[70%] basis-[70%] text-left">
                <input
                  className={styles.input}
                  id="name"
                  type="password"
                  name="name"
                />
              </div>
            </div>
            <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
              <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                Mật khẩu mới
              </div>
              <div className="max-w-[70%] basis-[70%] text-left">
                <input
                  className={styles.input}
                  id="name"
                  type="password"
                  name="name"
                />
              </div>
            </div>
            <div className="flex w-full h-[40px] items-center justify-center my-[30px]">
              <div className="max-w-[30%] basis-[30%] text-left pr-[20px]">
                Nhập lại mật khẩu mới
              </div>
              <div className="max-w-[70%] basis-[70%] text-left">
                <input
                  className={styles.input}
                  id="name"
                  type="password"
                  name="name"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="rounded-[8px] p-[10px] m-[20px] bg-[#6abd45] text-[white] min-w-[150px] text-center uppercase hover:bg-[#5faf3d]">
                Cập nhật mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
