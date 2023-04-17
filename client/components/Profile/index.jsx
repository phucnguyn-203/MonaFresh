import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Avatar from "@/public/assets/img/avatar.png";

export default function Profile() {
    const [isDropdown, setIsDropdown] = useState();
    const profile = useRef(null);

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
        <div ref={profile} className="relative cursor-pointer" onClick={handleDropdownMenu}>
            <Image src={Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl" alt="userprofile" />
            {isDropdown && (
                <div className="absolute w-[200px] top-[100% + 20px] bg-gray-50 shadow-xl rounded-lg flex flex-col top-12 right-0 overflow-hidden ">
                    <Link href="/profile" className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-[rgba(102,102,102,0.85)]  text-base">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Tài Khoản Của Tôi{" "}
                    </Link>
                    <p className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-[rgba(102,102,102,0.85)]  text-base">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        Đơn Hàng{" "}
                    </p>
                    <p className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-[rgba(102,102,102,0.85)]  text-base">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                        </svg>
                        Đăng Xuất
                    </p>
                </div>
            )}
        </div>
    );
}
