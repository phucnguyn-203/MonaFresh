import { useState, useEffect, useRef } from "react";
import { IconProfile, IconLogout, IconOrder } from "@/components/icons";
import { useSelector, useDispatch } from "react-redux";
import { setLogoutUser } from "@/features/auth/authSlice";
import { setEmptyCart } from "@/features/cart/cartSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import userAPI from "@/api/userAPI";

export default function Profile({ url }) {
  const [isDropdown, setIsDropdown] = useState();
  const router = useRouter();
  const profile = useRef(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = async () => {
    try {
      await userAPI.logout();
      dispatch(setLogoutUser());
      dispatch(setEmptyCart());
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropdownMenu = () => {
    setIsDropdown(!isDropdown);
  };

  const handleClickOutSite = (event) => {
    if (profile.current?.contains(event.target)) {
      // click inside
      return;
    }
    //click outside
    setIsDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSite);
    return () => document.removeEventListener("click", handleClickOutSite);
  }, []);

  return (
    <div
      ref={profile}
      className="relative cursor-pointer"
      onClick={handleDropdownMenu}
    >
      <div className="flex-row flex items-center">
        <Image
          src={url}
          alt="avatar"
          width="150"
          height="150"
          className="w-10 h-10 rounded-full"
        />
        {currentUser?.name && (
          <p className="text-textHeaderPrimary text-sm pl-2 items-center justify-center">
            Xin chào, {currentUser.name}
          </p>
        )}
      </div>

      {isDropdown && (
        <div className="absolute w-[200px] top-[100% + 20px] bg-gray-50 shadow-xl rounded-lg flex flex-col top-12 right-0 overflow-hidden ">
          <Link
            href={{ pathname: '/profile', query: {optionSidebar: 0} }}
            className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-[rgba(102,102,102,0.85)]  text-base"
          >
            <IconProfile />
            Tài Khoản Của Tôi{" "}
          </Link>
          <Link
            href={{ pathname: '/profile', query: {optionSidebar: 1} }}
            className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-[rgba(102,102,102,0.85)]  text-base"
          >
            <IconOrder />
            Đơn Hàng Của Tôi{" "}
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-[rgba(102,102,102,0.85)]  text-base"
          >
            <div>
              <IconLogout />
            </div>
            <span> Đăng Xuất</span>
          </button>
        </div>
      )}
    </div>
  );
}
