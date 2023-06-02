import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLayout from "../../../components/layout/pageLayout";
import CustomerOrderListTable from "../../../components/customer/CustomerOrderListTable";
import BillCustomer from "../../../components/customer/Bill/BillCustomerOrder/BillCustomer";
import orderAPI from "../../../api/orderAPI";
import productAPI from "../../../api/productAPI";
import Filter from "../../../components/customer/Filter";
import Swal from "sweetalert2";
import useDebounce from "../../../hooks/useDebounce";
import { ORDER_STATUS } from "../../../utils/Constant";

export default function CustomerOrder() {
  const params = useParams();
  const userId = params.id;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [orders, setOrders] = useState([]);
  const [billData, setBillData] = useState();
  const [isShowBill, setIsShowBill] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [filterByStatus, setFilterByStatus] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);

  const getOrdersByUserId = async (userId) => {
    let params = { page: currentPage, limit: limitPerPage };
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    if (filterByStatus) {
      params.status = filterByStatus;
      console.log(filterByStatus);
    }
    if (sortValue) {
      params = { ...params, ...sortValue };
    }
    try {
      const response = await orderAPI.getOrdersByUserId(userId, params);
      setOrders(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateOrder = async (id, data) => {
    await orderAPI.updaterOrder(id, data);
    await getOrdersByUserId(userId);
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
          await getOrdersByUserId(userId);
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
    getOrdersByUserId(userId);
  }, [userId, currentPage, limitPerPage, filterByStatus, sortValue, debounceValue]);

  return (
    <PageLayout title="Đơn hàng của khách hàng">
      <Filter
        filterByStatus={filterByStatus}
        setFilterByStatus={setFilterByStatus}
        sortValue={sortValue}
        setSortValue={setSortValue}
        setSearchKeyWord={setSearchKeyWord}
      />
      <CustomerOrderListTable
        orders={orders}
        handleUpdateOrder={handleUpdateOrder}
        handleShowBill={handleShowBill}
        handleReturnInventory={handleReturnInventory}
        handleConfirmOrder={handleConfirmOrder}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
        filterByStatus={filterByStatus}
        setFilterByStatus={setFilterByStatus}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      {isShowBill && <BillCustomer data={billData} close={handleShowBill} />}
    </PageLayout>
  );
}
