import Link from "next/link";
import formatCurrency from "@/utils/formatCurrency";
import styles from "./styles.module.css";


export default function ProductItem({ thumbnail, name, price, percentageDiscount }) {
    return (
        <Link href="/" className={`${styles.product} shadow-lg hover:shadow-gray-500`}>
            {percentageDiscount ? (
                <div
                    className={`bg-primary absolute min-w-[40px] h-[25px] right-0 text-white px-[4px] ${styles.labelProduct}`}
                >
                    <p>{` -${percentageDiscount * 100}%`}</p>
                </div>
            ) : null}

            <div className="overflow-hidden">
                <div
                    style={{ backgroundImage: `url(${thumbnail})` }}
                    className={` pt-[100%] bg-no-repeat bg-contain bg-center `}
                ></div>
            </div>
            <div className="text-center mt-[10px] mx-[10px] mb-[20px]">
                <p className="text-[#1C1C1C] hover:text-[#6abd45] font-semibold truncate">{name}</p>
                <div className="flex justify-center items-center gap-x-4">
                    {percentageDiscount ? (
                        <>
                            <div className="text-[#6abd45] mb-[10px] ">
                                {formatCurrency(price - price * percentageDiscount)}
                            </div>
                            <div className="text-[#666666] mb-[10px] line-through decoration-solid text-sm">
                                {formatCurrency(price)}
                            </div>
                        </>
                    ) : (
                        <div className="text-[#6abd45] mb-[10px] ">{formatCurrency(price)}</div>
                    )}
                </div>
                <div>
                    <button className="bg-primary text-white px-5 py-3 text-xs hover:bg-lime-600 rounded-md">
                        THÊM VÀO GIỎ HÀNG
                    </button>
                </div>
            </div>
        </Link>
    );
}
//className={`flex flex-col items-center min-h-[210px] max-h-[350px] w-full border-gray-100 border border-solid shadow-md hover:shadow-2xl mx-[5px]  ${styles.scaleImg}`}
