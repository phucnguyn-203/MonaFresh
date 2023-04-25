import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import formatCurrency from "@/utils/formatCurrency";
import CartItem from "@/components/cart/CardItem";

import { carts } from "@/api/data";

export default function Cart() {
  const router = useRouter();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(carts);
  }, [list]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsChecked(list.map((item) => item));
    if (isCheckAll) {
      setIsChecked([]);
    }
  };

  const handleChecked = (item, event) => {
    const { id, checked } = event.target;
    setIsChecked([...isChecked, item]);
    console.log(id);
    if (!checked) {
      setIsChecked(isChecked.filter((item) => item.id !== +id));
    }
  };

  const total = isChecked.reduce(
    (total, item) =>
      total +
      (item.product.price -
        item.product.price * item.product.percentageDiscount) *
        item.quantity,
    0,
  );

  return (
    <div className="container bg-[white] my-32">
      <div className="py-[30px] box-border flex">
        <div className="w-[60%] px-3">
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
                    <div className="text-center items-center ">Sản phẩm</div>
                  </div>
                </td>
                <td className="p-2 text-left ">Giá</td>
                <td className="p-2 text-center ">Số lượng</td>
                <td className="p-2 text-right ">Tổng</td>
                <td className="p-2 text-right "> </td>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <CartItem
                  key={cart.id}
                  cart={cart}
                  handleChecked={handleChecked}
                  isChecked={isChecked.find((item) => item.id === cart.id)}
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
            <button className="text-center bg-primary text-[white] w-[25%] min-h-[40px] ml-[10px] flex items-center justify-center uppercase hover:bg-[#93db73e3]">
              <div>Cập nhật giỏ hàng</div>
            </button>
            <button
              disabled={isChecked.length === 0}
              className={`${
                isChecked.length === 0 ? "bg-[#CCCCCC] cursor-not-allowed" : ""
              } text-center bg-[#d26e4b] text-[white] w-[27%] min-h-[40px] ml-[10px] flex items-center justify-center uppercase`}
            >
              <div>Xoá các mục đã chọn</div>
            </button>
          </div>
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
                  {formatCurrency(total)}
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
                  {formatCurrency(total)}
                </div>
              </div>
            </div>

            <div className="border-t-[2px] border-[#ececec] pt-[20px]">
              <button
                onClick={() => router.push("/checkout")}
                disabled={isChecked.length === 0}
                className={`${
                  isChecked.length === 0
                    ? "bg-[#CCCCCC] cursor-not-allowed"
                    : ""
                } bg-[#d26e4b] text-[white] w-full min-h-[40px] flex items-center text-center justify-center uppercase`}
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
