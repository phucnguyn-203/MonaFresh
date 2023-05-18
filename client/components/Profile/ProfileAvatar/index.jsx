import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Avatar from "@/public/assets/img/avatar.png";
import { IconProfile } from "@/components/icons";
import { IconLogout } from "@/components/icons";
import { useDispatch } from "react-redux";
import userAPI from "@/api/userAPI";
import { setLogoutUser } from "@/features/auth/authSlice";
import { useRouter } from "next/router";

export default function Profile({ url, size = 24 }) {
  const [isDropdown, setIsDropdown] = useState();
  const router = useRouter();
  const profile = useRef(null);
  const dispatch = useDispatch();

  console.log(router);

  const handleLogout = async () => {
    try {
      await userAPI.logout();
      dispatch(setLogoutUser());
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
      <Image
        src={url}
        alt="avatar"
        width={size}
        height={size}
        className="w-[size] h-[size] rounded-full"
      />
      {isDropdown && (
        <div className="absolute w-[200px] top-[100% + 20px] bg-gray-50 shadow-xl rounded-lg flex flex-col top-12 right-0 overflow-hidden ">
          <Link
            href="/profile"
            className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-[rgba(102,102,102,0.85)]  text-base"
          >
            <IconProfile />
            Tài Khoản Của Tôi{" "}
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
