import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAnItemInCart,
  deleteManyItemInCart,
} from "@/features/cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import calculateItemTotal from "@/utils/calculateItemTotal";
import Link from "next/link";
import formatCurrency from "@/utils/formatCurrency";
import CartItem from "@/components/cart/CardItem";
import WithAuth from "@/components/layout/WithAuth";
import Checkout from "../components/MyCart/Checkout/index";

function Cart() {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [list, setList] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [isShowCheckout, setIsShowCheckout] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleShowCheckout = () => {
    setIsShowCheckout(!isShowCheckout);
  };

  useEffect(() => {
    setList(cart.items);
  }, [list, isShowCheckout]);

  useEffect(() => {
    const purchase = isChecked.map((id) => {
      return cart.items.find(({ _id }) => id === _id);
    });
    setPurchase(purchase);
  }, [cart, isCheckAll, isChecked]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsChecked(list.map((item) => item._id));
    if (isCheckAll) {
      setIsChecked([]);
    }
  };

  const handleChecked = (event) => {
    const { id, checked } = event.target;
    setIsChecked([...isChecked, id]);
    if (!checked) {
      setIsChecked(isChecked.filter((item) => item !== id));
    }
  };

  const handleDeleteAnItemInCart = async (itemId) => {
    try {
      unwrapResult(await dispatch(deleteAnItemInCart(itemId)));
      setIsChecked(isChecked.filter((id) => id !== itemId));
      setPurchase(purchase.filter((item) => item._id !== itemId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteManyItemInCart = async (itemIds) => {
    try {
      unwrapResult(await dispatch(deleteManyItemInCart(itemIds)));
      setIsChecked([]);
      setPurchase([]);
    } catch (err) {
      console.log(err);
    }
  };

  const total = useCallback(() => {
    return purchase.reduce(
      (total, item) =>
        total + calculateItemTotal(item?.product, item?.quantity),
      0,
    );
  }, [cart, isCheckAll, isChecked, purchase]);

  return (
    <div className="container bg-[white] my-32">
      <div className="py-[30px] box-border flex">
        <div className="w-[60%] px-3">
          {cart.items.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="mb-5 text-lg">
                Chưa có sản phẩm nào trong giỏ hàng.
              </h1>
              <Link
                href="/shop"
                className="text-center border-[2px] border-primary bg-[white] text-primary w-[30%] min-h-[40px] flex items-center justify-center hover:text-[white] hover:bg-[#6abd45]"
              >
                <div>← Quay trở lại cửa hàng</div>
              </Link>
            </div>
          ) : (
            <React.Fragment>
              <table className="mb-4 border-[#ececec]">
                <thead className="border-b-[3px] border-[#ececec] text-base font-semibold uppercase tracking-wider">
                  <tr>
                    <td className="p-2 text-left">
                      <div className="flex items-center gap-x-2">
                        <label className="containerCheckbox">
                          <input
                            className="checkbox"
                            type="checkbox"
                            checked={isCheckAll}
                            onChange={handleSelectAll}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <div className="text-center items-center ">
                          Sản phẩm
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-left ">Giá</td>
                    <td className="p-2 text-center ">Số lượng</td>
                    <td className="p-2 text-right ">Tổng</td>
                    <td className="p-2 text-right "> </td>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      handleChecked={handleChecked}
                      isChecked={isChecked.find((id) => id === item._id)}
                      onDeleteAnItemInCart={handleDeleteAnItemInCart}
                    />
                  ))}
                </tbody>
              </table>
              <div className="text-[15px] font-semibold text-center mt-10px border-0 flex uppercase">
                <Link
                  href="/shop"
                  className="text-center border-[2px] border-primary bg-[white] text-primary w-[30%] min-h-[40px] flex items-center justify-center hover:text-[white] hover:bg-[#6abd45]"
                >
                  <div>← Tiếp tục xem sản phẩm</div>
                </Link>

                <button
                  disabled={purchase.length === 0}
                  className={`${
                    purchase.length === 0
                      ? "bg-[#CCCCCC] cursor-not-allowed"
                      : "bg-[#ee4d2d]"
                  } text-center text-[white] w-[27%] min-h-[40px] ml-[10px] flex items-center justify-center uppercase`}
                  onClick={() => handleDeleteManyItemInCart(isChecked)}
                >
                  Xoá các mục đã chọn
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="border-l-[1px] w-[40%] px-3">
          <div className="w-full mb-[1em] border-[#ececec] border-spacing-0 box-border">
            <div className="h-[55px] bg-[white] border-b-[3px] border-[#ececec] box-border tracking-[.05em] text-left p-[0.5em] w-full uppercase text-[15px]">
              <div className="flex items-center h-full text-16px font-[600]">
                Tổng số lượng
              </div>
            </div>
            <div className="min-h-[55px] bg-[white] box-border p-[0.5em] w-full text-[15px] flex items-center border-b-[1px] border-[#ececec]">
              <div className="w-[15%] text-left text-[15px] font-[600]">
                <div>Tổng phụ</div>
              </div>
              <div className="w-[85%] text-right text-[13px]">
                <div className="whitespace-nowrap text-[#6abd45] font-bold text-[16px]">
                  {formatCurrency(total())}
                </div>
              </div>
            </div>
            <div className="min-h-[55px] bg-[white] box-border p-[0.5em] w-full text-[15px] flex items-center border-b-[1px] border-[#ececec]">
              <div className="w-[15%] text-left text-[15px] font-[600]">
                <div>Giao hàng</div>
              </div>
              <div className="w-[85%] text-right text-[13px]">
                <div>Giao hàng miễn phí</div>
                <div>
                  Đây chỉ là ước tính. Giá sẽ cập nhật trong quá trình thanh
                  toán
                </div>
                <div>Tính phí giao hàng</div>
              </div>
            </div>
            <div className="min-h-[55px] bg-[white] box-border p-[0.5em] w-full text-[15px] flex items-center border-b-[1px] border-[#ececec]">
              <div className="w-[15%] text-left text-[15px] font-[600]">
                <div>Tổng</div>
              </div>
              <div className="w-[85%] text-right text-[13px]">
                <div className="whitespace-nowrap text-[#6abd45] font-bold text-[16px]">
                  {formatCurrency(total())}
                </div>
              </div>
            </div>

            <div className="border-t-[2px] border-[#ececec] pt-[20px]">
              <button
                onClick={() => handleShowCheckout()}
                disabled={purchase.length === 0}
                className={`${
                  purchase.length === 0
                    ? "bg-[#CCCCCC] cursor-not-allowed"
                    : "bg-[#ee4d2d]"
                }  text-[white] w-full min-h-[40px] flex items-center text-center justify-center uppercase`}
              >
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      {isShowCheckout && (
        <Checkout purchase={purchase} close={handleShowCheckout} />
      )}
    </div>
  );
}

export default WithAuth(Cart);
