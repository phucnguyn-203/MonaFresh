import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import {
    IconFacebook,
    IconInstagram,
    IconAddress,
    IconEmail,
    IconPhone,
} from "../../icons";

import logo from "../../../assets/logo.png";

export default function Footer() {
    return (
        <footer className={`${styles.footer} text-white`}>
            <div className="container flex gap-x-6 py-[80px] flex-1">
                <div className="w-1/4 flex flex-col justify-between">
                    <Link
                        to="/"
                        className="px-[15px] w-[270px] h-[51px] text-xl"
                    >
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className="px-[15px]">
                        <ul>
                            <li className="flex items-center py-[6px]">
                                <div className="flex min-h-[30px] justify-start">
                                    <IconAddress />
                                </div>
                                <p className="text-gray-400 ml-[10px] hover:text-[#6abd45] cursor-pointer">
                                    11 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1,
                                    TP.HCM
                                </p>
                            </li>
                            <li className="flex items-center py-[6px]">
                                <IconPhone />
                                <p className="text-gray-400 ml-[10px] hover:text-[#6abd45] cursor-pointer">
                                    0561234789
                                </p>
                            </li>
                            <li className="flex items-center py-[6px]">
                                <IconEmail />
                                <p className="text-gray-400 ml-[10px] hover:text-[#6abd45] cursor-pointer">
                                    nhom9@gmail.com
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-1/6 ">
                    <div className="mb-[15px] min-h-[36px] px-[15px]">
                        <h1 className="text-xl font-semibold ">SẢN PHẨM</h1>
                    </div>
                    <div className="px-[15px]">
                        <ul className={`text-gray-400 ${styles.list}`}>
                            <li>
                                <Link to="/shop">Rau củ</Link>
                            </li>
                            <li>
                                <Link to="/shop">Hải sản</Link>
                            </li>
                            <li>
                                <Link to="/shop">Đồ uống</Link>
                            </li>
                            <li>
                                <Link to="/shop">Trái cây</Link>
                            </li>
                            <li>
                                <Link to="/shop">Thịt trứng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-1/6 ">
                    <div className="mb-[15px] min-h-[36px] px-[15px]">
                        <h1 className="text-xl font-semibold">DANH MỤC</h1>
                    </div>
                    <div className="px-[15px]">
                        <ul className={`text-gray-400 ${styles.list}`}>
                            <li>
                                <Link to="">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to="/about">Giới thiệu</Link>
                            </li>
                            <li>
                                <Link to="/shop">Cửa hàng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-1/6 ">
                    <div className="mb-[15px] min-h-[36px] px-[15px]">
                        <h1 className="text-xl font-semibold">DỊCH VỤ</h1>
                    </div>
                    <div className="px-[15px]">
                        <ul className={`text-gray-400 ${styles.list}`}>
                            <li>
                                <Link to="/shop">Rau củ</Link>
                            </li>
                            <li>
                                <Link to="/shop">Hải sản</Link>
                            </li>
                            <li>
                                <Link to="/shop">Đồ uống</Link>
                            </li>
                            <li>
                                <Link to="/shop">Trái cây</Link>
                            </li>
                            <li>
                                <Link to="/shop">Thịt trứng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-1/4 ">
                    <div className="mb-[15px] min-h-[36px] px-[15px]">
                        <h1 className="text-xl font-semibold">ĐĂNG KÝ</h1>
                    </div>
                    <div className="text-[#A4A4A4A4] px-[15px]">
                        <p className="py-[6px]">
                            Đăng ký để nhận được được thông tin mới nhất từ
                            chúng tôi.
                        </p>
                        <input
                            type="text"
                            placeholder="Email"
                            className="my-[6px] w-full p-[8px] rounded-sm border-0 outline-none text-black"
                        />
                        <div className="flex w-full pt-[10px] cursor-pointer">
                            <div className="mr-[10px] w-[30px] h-[30px]">
                                <IconFacebook />
                            </div>
                            <div className="mx-[10px] w-[30px] h-[30px]">
                                <IconInstagram />
                            </div>
                        </div>
                        <ul></ul>
                    </div>
                </div>
            </div>
            <div className="text-center bg-[#000000] py-[15px] text-[#FFFFFF80]">
                <p>&copy; Bản quyền website thuộc D21CQAT01-N</p>
            </div>
        </footer>
    );
}
