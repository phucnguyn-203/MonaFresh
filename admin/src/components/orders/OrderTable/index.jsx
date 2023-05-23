import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { IconView } from "../../icon";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import formatTimestamp from "../../../utils/formatTimestamp";
import Bill from "../Bill";

export default function OrderTable({ orders }) {
  const [showBill, setShowBill] = useState(false);
  const handleShowBill = () => {
    setShowBill(!showBill);
  };

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
      headerName: "Nhân viên PT",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm ">{item.staffName}</p>
          </div>
        );
      },
    },
    {
      field: "method",
      headerName: "Thanh toán",
      renderCell: (item) => {
        return <span className="text-sm ">{item.payMethod}</span>;
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
      field: "status",
      headerName: "Trạng thái",
      renderCell: () => {
        return (
          <select className=" text-sm ">
            <option value="" hidden>
              Đang chờ
            </option>
            <option value="">Đã xác nhận</option>
            <option value="">Đã huỷ</option>
            <option value="">Đã trả hàng</option>
          </select>
        );
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
              onClick={handleShowBill}
            >
              <IconView />
            </button>
            {showBill && <Bill close={handleShowBill} />}
            {/* data={rowData.find((row) => row.OrderID)} */}
            <Tooltip id="view" style={{ backgroundColor: "var(--color-primary" }} />
          </span>
        );
      },
    },
  ];
  return <DataTable columnData={columnData} rowData={orders} />;
}
