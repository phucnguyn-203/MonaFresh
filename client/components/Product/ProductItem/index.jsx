import Link from "next/link";
import jsUcfirst from "@/utils/jsUcfirst";
import formatCurrency from "@/utils/formatCurrency";
import { useSelector, useDispatch } from "react-redux";
import { addAnItemToCart } from "@/features/cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import styles from "./styles.module.css";

export default function ProductItem({
  id,
  thumbnail,
  name,
  price,
  percentageDiscount,
}) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddAnItemToCart = async (e) => {
    e.preventDefault();
    try {
      unwrapResult(
        await dispatch(addAnItemToCart({ productId: id, quantity: 1 })),
      );
      Swal.fire({
        icon: "success",
        title: "Sản phẩm đã được thêm vào giỏ hàng",
        confirmButtonColor: "#6abd45",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Link
      href={`/shop/${id}`}
      className={`${styles.product} shadow-lg hover:shadow-gray-500`}
    >
      {percentageDiscount ? (
        <div
          className={`bg-primary absolute top-0 right-0 text-white w-12 h-6 text-center ${styles.labelProduct}`}
        >
          <p>{`-${percentageDiscount * 100}%`}</p>
        </div>
      ) : null}

      <div className="overflow-hidden">
        <div
          style={{ backgroundImage: `url(${thumbnail})` }}
          className={` pt-[100%] bg-no-repeat bg-contain bg-center `}
        ></div>
      </div>
      <div className="text-center mt-[10px] mx-[10px] mb-[20px]">
        <p className="text-[#1C1C1C] hover:text-[#6abd45] font-semibold truncate">
          {jsUcfirst(name)}
        </p>
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
            <div className="text-[#6abd45] mb-[10px] ">
              {formatCurrency(price)}
            </div>
          )}
        </div>
        <div>
          {cart.items.find((item) => item.product._id === id) ? (
            <button className="bg-[#CCCCCC] text-white px-5 py-3 text-xs cursor-not-allowed rounded-md">
              ĐÃ THÊM VÀO GIỎ
            </button>
          ) : (
            <button
              onClick={handleAddAnItemToCart}
              className="bg-primary text-white px-5 py-3 text-xs hover:bg-lime-600 rounded-md"
            >
              THÊM VÀO GIỎ HÀNG
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
