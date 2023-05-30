import React from "react";
import { Tooltip } from "react-tooltip";
import { IconView } from "../../icon";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import formatTimestamp from "../../../utils/formatTimestamp";
import { PAYMENT_METHOD } from "../../../utils/Constant";
import { PAYMENT_STATUS } from "../../../utils/Constant";
import { ORDER_STATUS } from "../../../utils/Constant";

export default function RecentOrdersTable({
  orders,
  handleUpdateOrder,
  handleConfirmOrder,
  handleReturnInventory,
  currentPage,
  setCurrentPage,
  totalPageCount,
  limitPerPage,
  setLimitPerPage,
  handleShowBill,
}) {
  const columnData = [
    {
      field: "orderName",
      headerName: "Mã đơn hàng",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm ">{item._id}</p>
          </div>
        );
      },
    },

    {
      field: "orderTime",
      headerName: "Thời gian đặt",
      renderCell: (item) => {
        return <span className="text-sm ">{formatTimestamp(item.createdAt)}</span>;
      },
    },
    {
      field: "customerName",
      headerName: "Tên khách hàng",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm ">{item.deliveryAddress.name}</p>
          </div>
        );
      },
    },
    {
      field: "staffName",
      headerName: "Nhân viên xác nhận",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm ">{item?.staff?.name}</p>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Giá Trị",
      renderCell: (item) => {
        return (
          <div className="text-sm font-semibold ">
            <span>{formatCurrency(item.orderTotal)}</span>
          </div>
        );
      },
    },
    {
      field: "method",
      headerName: "Thanh toán",
      renderCell: (item) => {
        if (item.paymentMethod === PAYMENT_METHOD.COD) {
          return <span className="text-sm">Tiền mặt</span>;
        } else {
          return <span className="text-sm">Online</span>;
        }
      },
    },
    {
      field: "paymentStatus",
      headerName: "Trạng thái thanh toán",
      renderCell: (item) => {
        if (item.paymentStatus === PAYMENT_STATUS.UNPAID) {
          return (
            <span className="py-1 px-2 bg-red-500 text-white rounded-full text-xs hover:bg-red-700 font-semibold">
              Chưa thanh toán
            </span>
          );
        } else {
          return (
            <span className="py-1 px-2 bg-primary text-white rounded-full text-xs hover:bg-red-700 font-semibold">
              Đã thanh toán
            </span>
          );
        }
      },
    },
    {
      field: "status",
      headerName: "Trạng thái đơn hàng",
      renderCell: (item) => {
        if (item.status === ORDER_STATUS.PENDING) {
          return (
            <span className="text-xs  text-yellow-800 rounded-full bg-yellow-200 px-2 py-1 leading-5 font-medium">
              Chờ xác nhận
            </span>
          );
        } else if (item.status === ORDER_STATUS.CONFIRMED) {
          return (
            <span className="text-xs text-green-800 rounded-full bg-green-200 px-2 py-1 leading-5 font-medium">
              Đã xác nhận
            </span>
          );
        } else if (item.status === ORDER_STATUS.DELIVERING) {
          return (
            <span className="text-xs text-teal-800 rounded-full bg-teal-200 px-2 py-1 leading-5 font-medium">
              Đang giao hàng
            </span>
          );
        } else if (item.status === ORDER_STATUS.DELIVERED) {
          return (
            <span className="text-xs text-white rounded-full bg-primary px-2 py-1 leading-5 font-medium">
              Đã giao hàng thành công
            </span>
          );
        } else if (item.status === ORDER_STATUS.CANCELED) {
          return (
            <span className="text-xs text-red-800 rounded-full bg-red-200 px-2 py-1 leading-5 font-medium">Đã huỷ</span>
          );
        } else {
          return (
            <span className="text-xs text-orange-800 rounded-full bg-orange-200 px-2 py-1 leading-5 font-medium">
              Trả hàng
            </span>
          );
        }
      },
    },
    {
      field: "updatedStatus",
      headerName: "Cập nhật trạng thái",
      renderCell: (item) => {
        if (item.status === ORDER_STATUS.PENDING) {
          return (
            <button
              className="py-1 px-2 bg-primary text-white rounded-full text-xs hover:bg-emerald-700 font-semibold"
              onClick={() => {
                handleConfirmOrder(item);
              }}
            >
              Xác nhận đơn hàng
            </button>
          );
        } else if (item.status === ORDER_STATUS.RETURNS) {
          return (
            <React.Fragment>
              {!item?.isReturn ? (
                <button
                  onClick={() => handleReturnInventory(item._id)}
                  className="py-1 px-2 bg-red-500 text-white rounded-full text-xs hover:bg-red-700 font-semibold"
                >
                  Hoàn trả sản phẩm về kho
                </button>
              ) : (
                <button className="py-1 px-2 bg-red-700 text-white rounded-full text-xs font-semibold cursor-not-allowed">
                  Đã hoàn trả sản phẩm về kho
                </button>
              )}
            </React.Fragment>
          );
        } else {
          return (
            <select
              disabled={item.status === ORDER_STATUS.DELIVERED || item.status === ORDER_STATUS.CANCELED}
              className="text-sm "
              value={item.status}
              onChange={(e) => handleUpdateOrder(item._id, { status: e.target.value })}
            >
              <option value="">Cập nhật trạng thái</option>
              <option value={ORDER_STATUS.DELIVERING}>Đang giao hàng</option>
              <option value={ORDER_STATUS.DELIVERED}>Đã giao hàng</option>
              <option value={ORDER_STATUS.RETURNS}>Đã trả hàng</option>
            </select>
          );
        }
      },
    },
    {
      field: "action",
      headerName: "Xem",
      renderCell: (item) => {
        return (
          <span className="flex justify-center">
            <button
              data-tooltip-id="view"
              data-tooltip-content="Xem chi tiết"
              className="text-left  cursor-pointer text-gray-400 hover:text-green-600"
              onClick={() => handleShowBill(item)}
            >
              <IconView />
            </button>
            <Tooltip id="view" style={{ backgroundColor: "var(--color-primary" }} />
          </span>
        );
      },
    },
  ];
  return (
    <DataTable
      columnData={columnData}
      rowData={orders}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPageCount={totalPageCount}
      limitPerPage={limitPerPage}
      setLimitPerPage={setLimitPerPage}
    />
  );
}
