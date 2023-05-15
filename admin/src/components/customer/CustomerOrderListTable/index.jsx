import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import Bill from "../../orders/Bill";
import { IconView } from "../../icon";

export default function CustomerOrderListTable() {
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
            <p className="text-sm ">{item.CustomerID}</p>
          </div>
        );
      },
    },

    {
      field: "orderTime",
      headerName: "Thời gian đặt",
      renderCell: (item) => {
        return <span className="text-sm ">{item.time}</span>;
      },
    },
    {
      field: "customerName",
      headerName: "Tên khách hàng",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm ">{item.customerName}</p>
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
      headerName: "Giá",
      renderCell: (item) => {
        return (
          <div className="text-sm font-semibold ">
            <span>{formatCurrency(item.price)}</span>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      renderCell: (item) => {
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
  const rowData = [
    {
      id: 1,
      name: "Võ Anh Phụng",
      email: "phung12@gmail.com",
      phone: "0796884386",
      avatar: "https://vapa.vn/wp-content/uploads/2022/12/anh-avatar-cute-002.jpg",
      dateCreateAccount: "25/04/2023",
    },
  ];
  return <DataTable columnData={columnData} rowData={rowData} />;
}
