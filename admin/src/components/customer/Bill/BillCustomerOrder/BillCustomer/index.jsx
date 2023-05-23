import React from "react";
import { IconClose } from "../../../../icon";
import formatCurrency from "../../../../../utils/formatCurrency";
import BillTable from "../BillTable";
import styles from "./styles.module.css";
import formatTimestamp from "../../../../../utils/formatTimestamp";
import formatOrderStatus from "../../../../../utils/formatOrderStatus";

export default function BillCustomer({ close, data }) {
  const columnData = [
    {
      field: "product",
      headerName: "Sản phẩm",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm ">{item.product.name}</p>
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
      headerName: "Giá",
      renderCell: (item) => {
        return (
          <div className="text-sm ">
            <span>{formatCurrency(item.product.price)}</span>
          </div>
        );
      },
    },
    {
      field: "percentDiscount",
      headerName: "Khuyến mãi",
      renderCell: (item) => {
        return (
          <div className="text-sm ">
            <span>{item.percentDiscount}%</span>
          </div>
        );
      },
    },
    {
      field: "total",
      headerName: "Tổng",
      renderCell: (item) => {
        return (
          <div className="text-sm ">
            <span>{formatCurrency(item.total)}</span>
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div onClick={close} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
      <div
        className={`${styles.navbar} bg-white fixed w-2/3 flex flex-col h-[90%] right-1/2 top-1/2 z-50 bg-opacity-100 shadow-2xl opacity-100 translate-x-[50%] translate-y-[-50%] rounded-[10px]`}
      >
        <div className="">
          <div className="flex">
            <div className="w-[95%] py-[5px] px-[20px] mb-[10px]">
              <h1 className="text-[30px] font-semibold">Thông tin hoá đơn</h1>
            </div>
            <div
              onClick={close}
              className="flex items-center w-[5%] text-left rounded-tr-[10px] bg-[#ee4d2d] text-[#fff] h-[40px] text-[25px] cursor-pointer hover:bg-[#e8340c]"
            >
              <IconClose />
            </div>
          </div>
          <h1 className="text-[25px] px-[20px] ">Mã hoá đơn: {data._id}</h1>

          <div className="p-[20px] flex gap-x-6 text-[16px]">
            <div className="w-[65%] min-h-[100px] border-r-[1px] border-solid">
              <h3>
                Tên khách hàng: <span className="ml-[5px]">{data.deliveryAddress.name}</span>
              </h3>
              <h3>
                SĐT: <span className="ml-[5px]">{data.deliveryAddress.phone}</span>
              </h3>
              <h3>
                Địa chỉ:
                <span className="ml-[5px]">{`${data.deliveryAddress.addressDetail}, ${data.deliveryAddress.ward}, ${data.deliveryAddress.district}, ${data.deliveryAddress.province}`}</span>
              </h3>
            </div>
            <div className="w-[35%] ">
              <h3>Thời gian đặt: {formatTimestamp(data.createdAt)}</h3>
              <h3>
                Trạng thái: <span className="ml-[5px]">{formatOrderStatus(data.paymentStatus)}</span>
              </h3>
              <h2>
                Nhân viên xác nhận:
                <span className="ml-[5px]">{data.staff ? data.staff.name : "Đang chờ"}</span>
              </h2>
            </div>
          </div>
          <div className="px-[20px] ">
            <BillTable columnData={columnData} rowData={data.orderDetail} />
          </div>
          <div className="p-[20px] ">
            <div className="flex gap-x-[40px] p-[20px] bg-[#F9FAFB] min-h-[55px] items-center justify-evenly">
              <div className="w-1/3 text-left flex flex-col">
                <h2 className="font-semibold uppercase">Phương thức</h2>
                <span className="text-[#707275] font-semibold">{data.paymentMethod}</span>
              </div>
              <div className="w-1/3 text-left">
                <h2 className="font-semibold uppercase">Tạm tính</h2>
                <span className="text-[#707275] ">{formatCurrency(data.orderTotal)}</span>
              </div>
              <div className="w-1/3 text-left">
                <h2 className="font-semibold uppercase">Tiền vận chuyển</h2>
                <span className="text-[#707275] ">{formatCurrency(0)}</span>
              </div>
              <div className="w-1/3 text-left">
                <h2 className="font-semibold uppercase">Tổng tiền</h2>
                <span className="text-[red] ">{formatCurrency(data.orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
