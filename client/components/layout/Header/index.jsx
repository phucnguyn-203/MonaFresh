import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { IconCart } from "@/components/icons";
import logo from "@/public/assets/img/logo.png";
import navigation from "@/utils/nav";
import SearchBar from "@/components/search/SearchBar";
import Profile from "@/components/profile/ProfileAvatar";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart);
  return (
    <header className={styles.header}>
      <div className="container flex h-full items-center justify-between">
        <Link href="/">
          <Image
            src={logo}
            className="w-[250px] h-[47px] object-cover"
            alt="logo"
            priority
          />
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                href={item.path}
                key={item.path}
                className={
                  router.pathname === item.path
                    ? "text-base px-4 py-3 rounded-lg duration-100 transition-all ease-in-out cursor-pointer bg-primary text-white"
                    : "text-base px-4 py-3 rounded-lg text-textHeaderPrimary duration-100 transition-all ease-in-out cursor-pointer hover:bg-primary hover:text-white"
                }
              >
                {item.title}
              </Link>
            ))}
          </ul>
          <SearchBar />
          <Link
            href="/cart"
            className="relative flex items-center justify-center cursor-pointer"
          >
            <IconCart />
            {currentUser ? (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cart.items.length}
                </p>
              </div>
            ) : null}
          </Link>
          {currentUser ? (
            <Profile url={currentUser?.photo} size={35} isActive={false} />
          ) : (
            <div className="text-textHeaderPrimary text-sm">
              <Link className="hover:text-black" href="/login">
                Đăng nhập
              </Link>{" "}
              <span>/</span>{" "}
              <Link className="hover:text-black" href="/register">
                Đăng kí
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
