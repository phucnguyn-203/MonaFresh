import Link from "next/link";
import jsUcfirst from "@/utils/jsUcfirst";
import formatCurrency from "@/utils/formatCurrency";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addAnItemToCart } from "@/features/cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import styles from "./styles.module.css";
import Loading from "@/components/loading";
import { useState } from "react";

export default function ProductItem({
  id,
  thumbnail,
  name,
  price,
  percentageDiscount,
  quantity,
}) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddAnItemToCart = async (e) => {
    e.preventDefault();
    if (!auth.isAuth) {
      router.push("/login");
      return;
    }
    try {
      if (quantity === 0) {
        const result = await Swal.fire({
          title: "Hàng đã hết!",
          text: "Bạn có thể đặt trước và chờ chậm hơn 1-2 ngày!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#6abd45",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tôi đồng ý",
          cancelButtonText: "Hẹn khi khác",
        });

        if (result.isConfirmed) {
          setIsLoading(true);
          await dispatch(addAnItemToCart({ productId: id, quantity: 1 }));
          Swal.fire({
            icon: "success",
            title: "Sản phẩm đã được thêm vào giỏ hàng",
            confirmButtonColor: "#6abd45",
          });
        }
      } else {
        setIsLoading(true);
        await dispatch(addAnItemToCart({ productId: id, quantity: 1 }));
        Swal.fire({
          icon: "success",
          title: "Sản phẩm đã được thêm vào giỏ hàng",
          confirmButtonColor: "#6abd45",
        });
      }
    } catch (err) {
      setIsLoading(false);
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
          {cart.items.find((item) => item?.product?._id === id) ? (
            <button className="bg-[#CCCCCC] text-white px-5 py-3 text-xs cursor-not-allowed rounded-md">
              ĐÃ THÊM VÀO GIỎ
            </button>
          ) : (
            <button
              disabled={isLoading}
              onClick={handleAddAnItemToCart}
              className={`bg-primary text-white px-5 py-3 text-xs hover:bg-lime-600 rounded-md ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              // className=""
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size={30} />
                </div>
              ) : (
                "THÊM VÀO GIỎ HÀNG"
              )}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
