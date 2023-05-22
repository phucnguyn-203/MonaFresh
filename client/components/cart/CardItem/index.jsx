import React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { updateQuantityOfAnItem } from "@/features/cart/cartSlice";
import Link from "next/link";
import Image from "next/image";
import formatCurrency from "@/utils/formatCurrency";
import jsUcfirst from "@/utils/jsUcfirst";

export default function CartItem({
  item = {},
  handleChecked,
  isChecked = false,
  onDeleteAnItemInCart,
}) {
  const { product, quantity } = item;
  const { thumbnail, name, price, percentageDiscount } = product;
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

  return (
    <tr className="border-b-[1px] border-[#ececec]">
      <td className="text-[15px] font-[200] w-[50%] p-2 leading-[1.05] tracking-[.05em] text-left">
        <div className="w-full pl-[0] flex justify-between items-center gap-x-2">
          <label className="containerCheckbox">
            <input
              id={item._id}
              className="checkbox"
              type="checkbox"
              onChange={(event) => handleChecked(event)}
              checked={isChecked}
            />
            <span className="checkmark"></span>
          </label>
          <Image width={100} height={100} src={thumbnail} alt="" />
          <Link href="/shop" className="hover:text-primary flex-1">
            {jsUcfirst(name)}
          </Link>
        </div>
      </td>
      <td className="text-base font-bold w-[14%] p-2 leading-[1.05] tracking-[.05em] text-left whitespace-nowrap text-[#6abd45]">
        {percentageDiscount ? (
          <React.Fragment>
            <p>{formatCurrency(price - price * percentageDiscount)}</p>
            <p className="text-sm text-[#0000008a] font-normal line-through">
              {formatCurrency(price)}
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>{formatCurrency(price)}</React.Fragment>
        )}
      </td>
      <td className="text-[15px] font-[200] w-[14%] p-2 leading-[1.05] tracking-[.05em] text-left">
        <div className="m-0 text-center opacity-100 inline-flex whitespace-nowrap align-top">
          <button
            className="w-[25px] h-[40px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal"
            onClick={() => {
              if (quantity > 1) {
                handleUpdateQuantity(item._id, quantity - 1);
              }
            }}
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
            className="w-[25px] h-[40px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal"
            onClick={() => handleUpdateQuantity(item._id, quantity + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td className="text-[15px] font-bold w-[14%] p-2 leading-[1.05] tracking-[.05em] text-right whitespace-nowrap text-[#6abd45]">
        {formatCurrency(quantity * (price - price * percentageDiscount))}
      </td>
      <td className="text-[15px] font-[200] w-[14%] p-2 leading-[1.05] tracking-[.05em] text-right">
        <button
          className="w-[25px] h-[25px] truncate relative text-[#ddd] text-[25px] font-normal hover:text-[#d26e4b] hover:scale-[120%]"
          onClick={() => onDeleteAnItemInCart(item._id)}
        >
          ✖
        </button>
      </td>
    </tr>
  );
}
