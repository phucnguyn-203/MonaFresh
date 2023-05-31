import React from "react";

import { IconClose } from "../../icon";
import formatCurrency from "../../../utils/formatCurrency";
import formatTimestamp from "../../../utils/formatTimestamp";
import BillTable from "../BillTable";
import styles from "./styles.module.css";
import jsUcfirst from "../../../utils/jsUcfirst";

export default function Bill({ close, invoice }) {
  const columnData = [
    {
      field: "product",
      headerName: "Sản phẩm",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm ">{jsUcfirst(item.name)}</p>
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Số lượng",
      renderCell: (item) => {
        return (
          <div className="text-sm ">
            <span>{item.quantity}</span>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Giá nhập",
      renderCell: (item) => {
        return (
          <div className="text-sm ">
            <span>{formatCurrency(item.price)}</span>
          </div>
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Thành tiền",
      renderCell: (item) => {
        return (
          <div className="text-sm ">
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        );
      },
    },
  ];

  const totalPayment = () => {
    let result = 0;
    invoice.products.map((item) => {
      result += item.price * item.quantity;
    });
    return result;
  };

  return (
    <React.Fragment>
      <div onClick={close} className="bg-black/30 top-0 right-0 left-0 w-full h-full fixed z-20"></div>
      <div
        className={`${styles.navbar} bg-white fixed w-2/3 flex flex-col h-[90%] right-1/2 top-1/2 z-50 bg-opacity-100 shadow-2xl opacity-100 translate-x-[50%] translate-y-[-50%] rounded-[10px]`}
      >
        <div className="">
          <div className="flex">
            <div className="w-[95%] py-[5px] px-[20px] mb-[10px]">
              <h1 className="text-[30px] font-semibold">Thông tin hoá đơn nhập hàng</h1>
            </div>
            <div
              onClick={close}
              className="flex items-center w-[5%] text-left rounded-tr-[10px] bg-[#ee4d2d] text-[#fff] h-[40px] text-[25px] cursor-pointer hover:bg-[#e8340c]"
            >
              <IconClose />
            </div>
          </div>

          <div className="px-[20px] py-[10px] flex gap-x-6 text-[16px]">
            <div className="w-[65%] min-h-[100px] ">
              <h1 className="text-[20px] my-[3px]">
                Mã hoá đơn <span className="ml-[53px]">{invoice._id}</span>
              </h1>
              <h3 className="my-[3px]">
                Nhân viên nhập hàng <span className="ml-[20px]">{invoice.createdBy.name}</span>
              </h3>
              <h3 className="my-[3px]">
                Thời gian nhập <span className="ml-[56px]">{formatTimestamp(invoice.createdAt)}</span>
              </h3>
            </div>
          </div>
          <div className="px-[20px] ">
            <BillTable columnData={columnData} rowData={invoice.products} />
          </div>
          <div className="p-[20px] ">
            <div className="flex gap-x-[40px] p-[20px] bg-[#F9FAFB] min-h-[55px] items-center justify-evenly">
              <div className="w-1/3 text-left flex flex-col">
                <h2 className="font-semibold uppercase">Phương thức</h2>
                <span className="text-[#707275] font-semibold">Tiền mặt</span>
              </div>
              <div className="w-1/3 text-left">
                <h2 className="font-semibold uppercase">Tạm tính</h2>
                <span className="text-[#707275] ">{formatCurrency(totalPayment())}</span>
              </div>
              <div className="w-1/3 text-left">
                <h2 className="font-semibold uppercase">Tiền vận chuyển</h2>
                <span className="text-[#707275] ">{formatCurrency(0)}</span>
              </div>
              <div className="w-1/3 text-left">
                <h2 className="font-semibold uppercase">Tổng tiền</h2>
                <span className="text-[red] ">{formatCurrency(totalPayment())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
