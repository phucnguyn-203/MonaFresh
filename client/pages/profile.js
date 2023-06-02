import { useEffect, useState } from "react";
import styles from "@/styles/Profile.module.css";
import MyProfile from "@/components/profile/MyProfile";
import MyOders from "@/components/profile/MyOders/";
import Image from "next/image";
import WithAuth from "@/components/layout/WithAuth";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
function Profile() {
  
  const router = useRouter();
  const [sidebar, setSidebar] = useState();
  const currentUser = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    setSidebar(router.query.tabIndex);
  },[router.query.tabIndex]);
  return (

    <div className="container my-32">
      <div className="flex">
        <div className="rounded-[8px] max-w-[25%] basis-[25%] w-full bg-white h-[250px] px-[30px] justify-center items-center text-right ">
          <div className="py-[20px] border-b-[1px] border-[#ececec]">
            <div className="flex w-full justify-center items-center">
              <div className="max-w-[30%]">
                <Image
                  src={currentUser?.photo}
                  className="w-16 h-16 drop-shadow-xl border rounded-full"
                  alt="userprofile"
                  priority
                  width="150"
                  height="150"
                />
              </div>
              <div className="max-w-[70%] basis-[70%] py-[10px] pr-[10px]">
                <div className="w-full max-h-[50%] basis-[50%] h-full text-[17px] font-[550]">
                  {currentUser?.name}
                </div>
                <div className="w-full max-h-[50%] basis-[50%] h-full text-[13px] text-gray-400">
                  Chỉnh sửa thông tin
                </div>
              </div>
            </div>
          </div>
          <ul>
            <li
              className={`${
                sidebar == 0 ? `${styles.active}` : ""
              } text-center mt-[15px] font-medium text-lg cursor-pointer py-2`}
            >
              <div onClick={() => {
                  router.query.tapIndex=0;
                  setSidebar(0);
                }}>Tài khoản của tôi</div>
            </li>
            <li
              className={`${
                sidebar == 1 ? `${styles.active}` : ""
              } text-center mt-[15px] font-medium text-lg cursor-pointer py-2`}
            >
              <div
                onClick={() => {
                  router.query.tapIndex=0;
                  setSidebar(1);
                }}
              >
                Đơn hàng của tôi
              </div>
            </li>
          </ul>
        </div>
        <div className="max-w-[75%] basis-[75%] w-full ">
          {sidebar == 0 ? <MyProfile /> : <MyOders />}
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Profile);
