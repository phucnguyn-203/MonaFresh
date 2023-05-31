import React from "react";
import { IconClose } from "../../../../icon";
import jsUcfirst from "../../../../../utils/jsUcfirst";
import formatCurrency from "../../../../../utils/formatCurrency";
import formatOrderStatus from "../../../../../utils/formatOrderStatus";
import formatTimestamp from "../../../../../utils/formatTimestamp";
import styles from "./styles.module.css";

export default function Bill({ close, data }) {
  const columnData = [
    {
      field: "product",
      headerName: "Sản phẩm",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 pl-3">
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
          <div className="text-sm text-center">
            <span>{item.quantity}</span>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Đơn giá",
      renderCell: (item) => (
        <div className="text-xs font-medium">
          <span style={item.percentageDiscount !== 0 ? { textDecoration: "line-through" } : {}}>
            {formatCurrency(item.price)}
          </span>
          {item.percentageDiscount !== 0 && (
            <span className="text-sm font-medium flex flex-row">
              {formatCurrency(item.price - item.price * item.percentageDiscount)}
            </span>
          )}
        </div>
      ),
    },

    {
      field: "total",
      headerName: "Tổng",
      renderCell: (item) => {
        return (
          <div className="text-sm font-medium text-red-500">
            <span>{formatCurrency(item.total)}</span>
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div onClick={close} className="bg-black/30 top-0 right-0 left-0 w-full h-full fixed z-20">
        <div
          className={`${styles.navbar} bg-white fixed w-[512px] flex flex-col h-[90%]   right-1/2 top-1/2 z-50 bg-opacity-100 opacity-100 translate-x-[50%] translate-y-[-50%] rounded-[10px]`}
        >
          <div className="flex justify-end">
            <div
              onClick={close}
              className="flex items-center w-[5%] h-[35px] text-left rounded-tr-[10px] bg-[#ee4d2d] text-[#fff]  text-[25px] cursor-pointer hover:bg-[#e8340c]"
            >
              <IconClose />
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto bg-white px-4 pb-4">
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold uppercase">Đơn hàng</h1>
              <p className="text-sm text-gray-500">Ngày: {formatTimestamp(data.createdAt)}</p>
            </div>
            <div className="flex justify-between mb-6">
              <div>
                <p className="my-1 text-sm">
                  <span className="font-bold">Mã hoá đơn: </span>
                  <span>{data.deliveryAddress._id}</span>
                </p>
                <p className="my-1 font-bold text-sm">Tên khách hàng: {data.deliveryAddress.name}</p>
                <p className="my-1 text-sm">
                  <span className="font-bold ">Số điện thoại:</span> {data.deliveryAddress.phone}
                </p>

                <p className="my-1 text-sm">
                  <span className="font-bold">Địa chỉ: </span>
                  <span>{`${data.deliveryAddress.addressDetail}, ${data.deliveryAddress.ward}, ${data.deliveryAddress.district}, ${data.deliveryAddress.province}`}</span>
                </p>
                <p className="my-1 text-sm">
                  <span className="font-bold">Tình trạng: </span> <span>{formatOrderStatus(data.status)}</span>{" "}
                </p>
                <p className="my-1 text-sm">
                  <span className="font-bold">Nhân viên xác nhận: </span>
                  <span>{data.staff ? data.staff.name : "Đang chờ"}</span>
                </p>
                <p className="my-1 text-sm">
                  <span className="font-bold">Phương thức thanh toán: </span>
                  <span>{data.paymentMethod === 1 ? "Thanh toán tiền mặt" : "Thanh toán online"}</span>
                </p>
              </div>
            </div>
            <div className="w-full overflow-hidden border border-gray-200 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 rounded-b-lg">
              <div className="w-full">
                <table className="w-full whitespace-nowrap">
                  <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase bg-gray-100">
                    <tr>
                      {columnData.map((columnItem) => (
                        <td key={columnItem.field} className="px-4 py-2">
                          {columnItem.headerName}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-10 text-gray-700">
                    {data.orderDetail.map((rowItem) => (
                      <tr key={rowItem._id}>
                        {columnData.map((columnItem) => (
                          <td key={columnItem.field} className="px-2 py-2">
                            {columnItem.renderCell ? (
                              columnItem.renderCell(rowItem)
                            ) : (
                              <span className="text-xs">{rowItem[columnItem.field]}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}

                    <tr>
                      <td colSpan={columnData.length - 1} className="text-left pl-4 py-2 text-sm font-semibold">
                        Tiền vận chuyển
                      </td>
                      <td className="px-2 py-2 text-justify text-sm font-semibold text-[red]">{formatCurrency(0)}</td>
                    </tr>
                    <tr>
                      <td colSpan={columnData.length - 1} className="text-left pl-4 py-2 text-sm font-semibold">
                        Tổng tiền
                      </td>
                      <td className="px-2 py-2 text-justify text-sm font-semibold text-[red]">
                        {formatCurrency(data.orderTotal)}
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
