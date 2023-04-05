import Link from "next/link";
import formatCurrency from "@/utils/formatCurrency";
import styles from "./styles.module.css";

export default function ProductItem({ thumbnail, name, price }) {
    return (
        <Link
            href="/"
            className={`${styles.product} shadow-lg hover:shadow-gray-500`}
        >
            <div className="overflow-hidden">
                <div
                    style={{ backgroundImage: `url(${thumbnail})` }}
                    className={`${styles.productThumnail} pt-[100%] bg-no-repeat bg-contain bg-center transition-transform ease-linear duration-300`}
                ></div>
            </div>
            <div className="text-center mt-[10px] mx-[10px] mb-[20px]">
                <p className="text-[#1C1C1C] hover:text-[#6abd45] font-semibold truncate">
                    {name}
                </p>

                <div className="text-[#6abd45] mb-[10px]">
                    {formatCurrency(price)}
                </div>
                <div>
                    <button className="bg-[#6abd45] text-white px-5 py-3 text-xs hover:bg-lime-600 rounded-md">
                        THÊM VÀO GIỎ HÀNG
                    </button>
                </div>
            </div>
        </Link>
    );
}
//className={`flex flex-col items-center min-h-[210px] max-h-[350px] w-full border-gray-100 border border-solid shadow-md hover:shadow-2xl mx-[5px]  ${styles.scaleImg}`}
