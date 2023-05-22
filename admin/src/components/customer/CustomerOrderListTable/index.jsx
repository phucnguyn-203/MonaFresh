import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { IconView } from "../../icon";
import formatTimestamp from "../../../utils/formatTimestamp";
import BillCustomer from "../Bill/BillCustomerOrder/BillCustomer";
import { useSelector } from "react-redux";
import orderAPI from "../../../api/orderAPI";
import { useParams } from "react-router-dom";
import { ORDER_STATUS } from "../../../utils/Constant";
import { PAYMENT_METHOD } from "../../../utils/Constant";
import { PAYMENT_STATUS } from "../../../utils/Constant";

export default function CustomerOrderListTable() {
  const [order, setOrder] = useState("");
  const params = useParams();
  const userId = params.id;
  const [showBill, setShowBill] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const handleShowBill = () => {
    setShowBill(!showBill);
  };
  console.log(currentUser.name);
  const handleUpdateOder = async (id, data) => {
    await orderAPI.updateOder(id, data);
    await getOrdersByUserId(userId);
  };
  const getOrdersByUserId = async (userId) => {
    try {
      const response = await orderAPI.getOrdersByUserId(userId);
      setOrder(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrdersByUserId(userId);
  }, [userId]);

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
            <p className="text-sm ">{item.staff}</p>
          </div>
        );
      },
    },
    {
      field: "method",
      headerName: "Thanh toán",
      renderCell: (item) => {
        if (item.paymentMethod === PAYMENT_METHOD.ONL) {
          return <span className="text-sm">Thanh toán online</span>;
        } else {
          return <span className="text-sm">Thanh toán bằng tiền mặt</span>;
        }
      },
    },
    {
      field: "paymentStatus",
      headerName: "Trạng thái thanh toán",
      renderCell: (item) => {
        if (item.paymentStatus === PAYMENT_STATUS.UNPAID) {
          return <span className="text-sm">Chưa thanh toán</span>;
        } else {
          return <span className="text-sm">Đã thanh toán</span>;
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
        <div></div>;
        if (item.status === ORDER_STATUS.PENDING) {
          return (
            <>
              <span className="text-xs  text-yellow-800 rounded-full bg-yellow-200 px-2 leading-5 font-medium">
                {`Chờ xác nhận`}
              </span>
            </>
          );
        } else if (item.status === ORDER_STATUS.CONFIRMED) {
          return (
            <span className="text-xs text-green-800 rounded-full bg-green-200 px-2 leading-5 font-medium">
              Đã xác nhận
            </span>
          );
        } else if (item.status === ORDER_STATUS.DELIVERING) {
          return (
            <span className="text-xs text-teal-800 rounded-full bg-teal-200 px-2 leading-5 font-medium">
              Đang giao hàng
            </span>
          );
        } else if (item.status === ORDER_STATUS.DELIVERED) {
          return (
            <span className="text-xs text-pink-800 rounded-full bg-pink-200 px-2 leading-5 font-medium">
              Đã giao hàng
            </span>
          );
        } else if (item.status === ORDER_STATUS.CANCELED) {
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
      headerName: "Cập nhật trạng thái",
      renderCell: (item) => {
        const handleChangeStatus = (event) => {
          const selectedStatus = event.target.value;
          handleUpdateOder(item._id, { status: selectedStatus });
        };
        if (item.status === ORDER_STATUS.PENDING) {
          return (
            <button
              className="py-1 px-2 bg-primary text-white rounded-full text-xs hover:bg-emerald-700 font-semibold"
              onClick={() => handleUpdateOder(item._id, { staff: currentUser._id, status: 2 })}
            >
              Xác nhận đơn hàng
            </button>
          );
        } else {
          return (
            <select className=" text-sm " value={item.status} onChange={handleChangeStatus}>
              <option value="">Cập nhật trạng thái</option>
              <option value="3">Đang giao hàng</option>
              <option value="4">Đã giao hàng</option>
              <option value="6">Đã trả hàng</option>
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
