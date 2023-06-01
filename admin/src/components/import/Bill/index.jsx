import React from "react";

import { IconClose } from "../../icon";
import formatCurrency from "../../../utils/formatCurrency";
import formatTimestamp from "../../../utils/formatTimestamp";
import styles from "./styles.module.css";
import jsUcfirst from "../../../utils/jsUcfirst";

export default function Bill({ close, invoice }) {
  const totalPayment = () => {
    let result = 0;
    invoice.products.map((item) => {
      result += item.price * item.quantity;
    });
    return result;
  };
  return (
    <React.Fragment>
      <div onClick={close} className="bg-black/30 top-0 right-0 left-0 w-full h-full fixed z-20">
        <div
          className={`${styles.navbar} bg-white fixed w-[512px] flex flex-col h-[90%]   right-1/2 top-1/2 z-50 bg-opacity-100 opacity-100 translate-x-[50%] translate-y-[-50%] rounded-[10px]`}
        >
          <div className="flex justify-end overflow-x-auto">
            <div
              onClick={close}
              className="flex items-center w-[5%] h-[35px] text-left rounded-tr-[10px] bg-[#ee4d2d] text-[#fff]  text-[25px] cursor-pointer hover:bg-[#e8340c]"
            >
              <IconClose />
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto bg-white px-4 pb-4">
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold uppercase">Đơn nhập hàng</h1>
              <p className="text-sm text-gray-500">Ngày: {formatTimestamp(invoice.createdAt)}</p>
            </div>
            <div className="flex justify-between mb-6">
              <div>
                <p className="my-1 text-sm">
                  <span className="font-bold">Mã hoá đơn: </span>
                  <span>{invoice._id}</span>
                </p>
                <p className="my-1 font-bold text-sm">Tên nhân viên: {invoice.createdBy.name}</p>

                <p className="my-1 text-sm">
                  <span className="font-bold">Phương thức thanh toán: </span>
                  <span>{invoice.paymentMethod === 1 ? "Thanh toán tiền mặt" : "Thanh toán online"}</span>
                </p>
              </div>
            </div>
            <div className="w-full overflow-hidden border border-gray-200 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 rounded-b-lg">
              <div className="w-full">
                <table className="w-full whitespace-nowrap">
                  <thead className="text-xs divide-y divide-gray-10 divide-y-reverse font-semibold tracking-wide text-left text-gray-500 uppercase bg-gray-100">
                    <tr className="">
                      <td className="text-center py-2 ">
                        <div className="">Sản phẩm</div>
                      </td>
                      <td className="text-center py-2">
                        <div className="">Số lượng</div>
                      </td>
                      <td className="text-center py-2 px-3">
                        <div className="">Đơn giá</div>
                      </td>
                      <td className="text-right py-2 pr-3">
                        <div className="">Thành tiền</div>
                      </td>
                    </tr>
                    <tr></tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-10 text-gray-700">
                    {invoice.products.map((item, index) => (
                      <tr key={index}>
                        <td className="pl-3">
                          <p className="text-sm">{jsUcfirst(item.name)}</p>
                        </td>
                        <td className="text-sm text-center">
                          <span>{item.quantity}</span>
                        </td>
                        <td className="text-sm text-center">
                          <span>{item.price}</span>
                        </td>
                        <td className="bg-white text-[red] font-normal  divide-y py-2 pr-3 text-right text-sm divide-gray-10 ">
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className="text-left pl-3 py-2 text-sm font-semibold">
                        Tạm tính
                      </td>
                      <td className="bg-white divide-y py-2 pr-3 text-right text-sm divide-gray-10 text-[red] font-semibold">
                        {formatCurrency(totalPayment())}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-left pl-3 py-2 text-sm font-semibold">
                        Tiền vận chuyển
                      </td>
                      <td className="bg-white divide-y py-2 pr-3 text-right text-sm divide-gray-10 text-[red] font-semibold">
                        {formatCurrency(0)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-left pl-3 py-2 text-sm font-semibold">
                        Tổng tiền
                      </td>
                      <td className="bg-white divide-y py-2 pr-3 text-right text-sm divide-gray-10 text-[red] font-semibold">
                        {formatCurrency(totalPayment())}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
