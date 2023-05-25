import React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { updateQuantityOfAnItem } from "@/features/cart/cartSlice";
import Link from "next/link";
import Image from "next/image";
import formatCurrency from "@/utils/formatCurrency";
import calculateItemTotal from "@/utils/calculateItemTotal";
import jsUcfirst from "@/utils/jsUcfirst";

export default function CartItem({
  item: { _id, product, quantity },
  handleChecked,
  isChecked = false,
  onDeleteAnItemInCart,
}) {
  const dispatch = useDispatch();

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      unwrapResult(
        await dispatch(updateQuantityOfAnItem({ itemId, quantity })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const formattedPrice = formatCurrency(product?.price);
  const discountedPrice = formatCurrency(
    product?.price - product?.price * product?.percentageDiscount,
  );

  const productIsActive = product?.isActive;

  return (
    <tr
      className={`border-b-[1px] border-[#ececec] ${
        !productIsActive ? "opacity-30 cursor-not-allowed" : ""
      }`}
    >
      <td className="text-[15px] font-[200] w-[50%] p-2 leading-[1.05] tracking-[.05em] text-left">
        <div className="w-full pl-[0] flex justify-between items-center gap-x-2">
          <label className="containerCheckbox" htmlFor={_id}>
            <input
              id={_id}
              disabled={!productIsActive}
              className="checkbox cursor-not-allowed"
              type="checkbox"
              onChange={handleChecked}
              checked={isChecked}
            />
            <span className="checkmark"></span>
          </label>
          {productIsActive ? (
            <React.Fragment>
              <Image width={100} height={100} src={product?.thumbnail} alt="" />
              <Link
                href={`/shop/${product._id}`}
                className="hover:text-primary flex-1"
              >
                {jsUcfirst(product?.name)}
              </Link>
            </React.Fragment>
          ) : (
            <div>Sản phẩm tạm thời ngừng kinh doanh hoặc đã xoá</div>
          )}
        </div>
      </td>
      {productIsActive ? (
        <td className="text-base font-bold w-[14%] p-2 leading-[1.05] tracking-[.05em] text-left whitespace-nowrap text-[#6abd45]">
          {product?.percentageDiscount ? (
            <React.Fragment>
              <p>{discountedPrice}</p>
              <p className="text-sm text-[#0000008a] font-normal line-through">
                {formattedPrice}
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>{formattedPrice}</React.Fragment>
          )}
        </td>
      ) : (
        <td></td>
      )}
      <td className="text-[15px] font-[200] w-[14%] p-2 leading-[1.05] tracking-[.05em] text-left">
        <div className="text-center opacity-100 inline-flex whitespace-nowrap align-top">
          <button
            className={`w-[25px] h-[40px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal ${
              !productIsActive ? "cursor-not-allowed" : ""
            }`}
            disabled={quantity <= 1 || !productIsActive}
            onClick={() => handleUpdateQuantity(_id, quantity - 1)}
          >
            -
          </button>
          <input
            type="number"
            className="w-[65px] h-[40px] border-[1px] border-solid text-center outline-none"
            value={quantity}
            readOnly
          />
          <button
            className={`w-[25px] h-[40px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal ${
              !productIsActive ? "cursor-not-allowed" : ""
            }`}
            disabled={!productIsActive}
            onClick={() => handleUpdateQuantity(_id, quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      {productIsActive ? (
        <td className="text-[15px] font-bold w-[14%] p-2 leading-[1.05] tracking-[.05em] text-right whitespace-nowrap text-[#6abd45]">
          {formatCurrency(calculateItemTotal(product, quantity))}
        </td>
      ) : (
        <td></td>
      )}
      <td className="text-[15px] font-[200] w-[14%] p-2 leading-[1.05] tracking-[.05em] text-right">
        <button
          className="w-[25px] h-[25px] truncate relative text-[#ddd] text-[25px] font-normal hover:text-[#d26e4b] hover:scale-[120%]"
          title="Delete"
          onClick={() => onDeleteAnItemInCart(_id)}
        >
          ✖
        </button>
      </td>
    </tr>
  );
}
