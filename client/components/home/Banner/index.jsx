import Link from "next/link";
import styles from "./styles.module.css";

import banner from "@/public/assets/img/bgHomtest.png";

export default function Banner() {
  return (
    <div
      style={{ backgroundImage: `url(${banner.src})` }}
      className={`${styles.banner}`}
    >
      <div className="w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute flex flex-col text-white justify-center items-center uppercase z-10">
        <div>
          <h2
            className="tracking-widest m-4 px-4 text-center font-bold "
            style={{ textShadow: "2px 6px 8px #292929" }}
          >
            <span className="text-4xl">tìm mua</span>{" "}
            <b className="text-6xl">Thực phẩm sạch</b>{" "}
            <span className="text-4xl"> từ</span>
            <span className="flex-col flex my-2"></span>
            <b className="text-6xl">Nhà cung cấp uy tín</b>
            <span className="text-4xl"> tại đây</span>
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-lg bg-[#6abd45] px-8 py-3 mt-3 rounded-lg uppercase hover:bg-lime-600 transition-all"
        >
          Mua ngay
        </Link>
      </div>
    </div>
  );
}
