import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import styles from "./styles.module.css";
import Logo from "../../../assets/logo.png";
import { IconCart } from "../../icons";
import navigation from "../../../utils/nav";
import SearchBar from "../../search/searchBar";
import ProfileAvatar from "../../profileAvatar";

export default function Header() {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <header className={styles.header}>
            {/*desktop & tablet*/}
            <div className="hidden md:flex w-full h-full items-center justify-around">
                <Link to="">
                    <img
                        src={Logo}
                        className="w-[250px] h-[47px] object-cover"
                        alt="logo"
                    />
                </Link>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        {navigation.map((item) => (
                            <NavLink
                                to={item.path}
                                key={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-base px-4 py-3 rounded-lg duration-100 transition-all ease-in-out cursor-pointer bg-primary text-white"
                                        : "text-base px-4 py-3 rounded-lg text-textHeaderPrimary duration-100 transition-all ease-in-out cursor-pointer hover:bg-primary hover:text-white"
                                }
                            >
                                {item.title}
                            </NavLink>
                        ))}
                    </ul>
                    <SearchBar />
                    {/* <SearchResult /> */}

                    <div className="relative flex items-center justify-center cursor-pointer">
                        <IconCart />
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">
                                2
                            </p>
                        </div>
                    </div>
                    {isLogin ? (
                        <ProfileAvatar />
                    ) : (
                        <div className="text-textHeaderPrimary text-sm">
                            <Link className="hover:text-black" to="/login">
                                Đăng nhập
                            </Link>{" "}
                            <span>/</span>{" "}
                            <Link className="hover:text-black" to="/signup">
                                Đăng kí
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
