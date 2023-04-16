import Image from "next/image";
import React from "react";
import styles from "@/components/layout/AuthLayout/styles.module.css";
import loginImg from "@/public/assets/img/login.png";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.layout}>
      <div
        className={`${styles.container} bg-gradient-to-r from-white to-green-200`}
      >
        <Image
          className="w-1/2 object-cover inline-block rounded-lg bg-gradient-to-r from-green-200 to-white"
          src={loginImg}
          alt=""
          priority
        />
        <div className="w-1/2 bg-green- flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
