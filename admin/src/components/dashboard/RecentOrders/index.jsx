import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ORDER_STATUS } from "../../../utils/Constant";
import orderAPI from "../../../api/orderAPI";
import productAPI from "../../../api/productAPI";
import Bill from "../../../components/orders/Bill";
import RecentOrdersTable from "../RecentOrdersTable";
import Swal from "sweetalert2";

export default function RecentOrders() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [orders, setOrders] = useState([]);
  const [billData, setBillData] = useState();
  const [isShowBill, setIsShowBill] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);

  const getAllOrder = async () => {
    let params = {
      page: currentPage,
      limit: limitPerPage,
      sort: "-createdAt",
    };

    try {
      const response = await orderAPI.getAllOrder(params);
      setOrders(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateOrder = async (id, data) => {
    await orderAPI.updaterOrder(id, data);
    await getAllOrder();
  };

  const checkInventory = async (orderDetail) => {
    const data = orderDetail.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });
    await productAPI.checkInventory(data);
  };

  const updateInventory = async (orderDetail) => {
    const data = orderDetail.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });
    await productAPI.updateInventory(data);
  };

  const handleReturnInventory = async (orderId) => {
    Swal.fire({
      title: "Xác hoàn trả sản phẩm về kho?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0E9F6E",
      cancelButtonColor: "#d33",
      cancelButtonText: "Huỷ bỏ",
      confirmButtonText: "Đồng ý!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await productAPI.returnInventory(orderId);
          await getAllOrder();
          Swal.fire({
            icon: "success",
            title: "Hoàn trả thành công",
            text: "Sản phẩm trong các đơn hàng đã được hoàn trả về kho",
            confirmButtonColor: "#0E9F6E",
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleConfirmOrder = async (item) => {
    Swal.fire({
      title: "Xác nhận đơn đặt hàng?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0E9F6E",
      cancelButtonColor: "#d33",
      cancelButtonText: "Huỷ bỏ",
      confirmButtonText: "Đồng ý!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await checkInventory(item.orderDetail);
          await handleUpdateOrder(item._id, { staff: currentUser._id, status: ORDER_STATUS.CONFIRMED });
          await updateInventory(item.orderDetail);
          Swal.fire({
            title: "Đơn hàng đã được xác nhận.",
            text: "Số lượng các sản phẩm trong kho hàng của bạn đã được cập nhật",
            confirmButtonColor: "#0E9F6E",
          });
        } catch (err) {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Không thể xác nhận",
            text: "Một trong các sản phẩm trong đơn hàng có số lượng lớn hơn số lượng hiện có trong kho. Vui lòng kiểm tra lại kho hàng của bạn trước khi xác nhận",
            confirmButtonColor: "#0E9F6E",
          });
        }
      }
    });
  };

  const handleShowBill = (item) => {
    setIsShowBill(!isShowBill);
    setBillData(item);
  };

  useEffect(() => {
    getAllOrder();
  }, [currentPage, limitPerPage]);

  return (
    <React.Fragment>
      <h1 className="my-6 text-lg font-bold">Đơn hàng gần đây</h1>
      <RecentOrdersTable
        orders={orders}
        handleUpdateOrder={handleUpdateOrder}
        handleReturnInventory={handleReturnInventory}
        handleShowBill={handleShowBill}
        handleConfirmOrder={handleConfirmOrder}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
      />
      {isShowBill && <Bill data={billData} close={handleShowBill} />}
    </React.Fragment>
  );
}
