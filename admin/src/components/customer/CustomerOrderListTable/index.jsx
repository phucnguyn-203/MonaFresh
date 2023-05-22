import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { IconView } from "../../icon";
import formatTimestamp from "../../../utils/formatTimestamp";
import BillCustomer from "../Bill/BillCustomerOrder/BillCustomer";
// import { IconConfirm } from "../../icon";
import ButtonConfirm from "./ButtonConfirm";
export default function CustomerOrderListTable({ order }) {
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
        if (item.paymentMethod === 1) {
          return <span className="text-sm">Thanh toán online</span>;
        } else {
          return <span className="text-sm">Thanh toán bằng tiền mặt</span>;
        }
      },
    },
    {
      field: "price",
      headerName: "Giá",
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
      headerName: "Trạng thái hiện tại",
      renderCell: (item) => {
        if (item.status === 1) {
          return (
            <>
              <span className="text-xs text-yellow-800 rounded-full bg-yellow-200 px-2 leading-5 font-medium">
                {`Chờ xác nhận`}
              </span>
              {/* <button className="p-5">
                <ButtonConfirm />
              </button> */}
            </>
          );
        } else if (item.status === 2) {
          return (
            <span className="text-xs text-blue-800 rounded-full bg-blue-200 px-2 leading-5 font-medium">
              Đã xác nhận
            </span>
          );
        } else if (item.status === 3) {
          return (
            <span className="text-xs text-teal-800 rounded-full bg-teal-200 px-2 leading-5 font-medium">Đang giao</span>
          );
        } else if (item.status === 4) {
          return (
            <span className="text-xs text-green-800 rounded-full bg-green-200 px-2 leading-5 font-medium">Đã giao</span>
          );
        } else if (item.status === 5) {
          return (
            <span className="text-xs text-red-800 rounded-full bg-red-200 px-2 leading-5 font-medium">Đã huỷ</span>
          );
        } else {
          return (
            <span className="text-xs text-orange-800 rounded-full bg-orange-200 px-2 leading-5 font-medium">
              Trả hàng
            </span>
          );
        }
      },
    },
    {
      field: "status",
      headerName: "Trạng thái cập nhật",
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
            {showBill && <BillCustomer order={order} close={handleShowBill} />}
            {/* data={rowData.find((row) => row.OrderID)} */}
            <Tooltip id="view" style={{ backgroundColor: "var(--color-primary" }} />
          </span>
        );
      },
    },
  ];

  return <DataTable columnData={columnData} rowData={order} />;
}
