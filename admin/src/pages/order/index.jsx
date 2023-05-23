import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/pageLayout";
import Fillter from "../../components/orders/Fillter";
import OrderTable from "../../components/orders/OrderTable";
import orderAPI from "../../api/orderAPI";
// import useDebounce from "../../hooks/useDebounce";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [filterByStatus, setFilterByStatus] = useState("");
  const [sortValue, setSortValue] = useState("");

  const getAllOrder = async () => {
    let params = { page: currentPage, limit: limitPerPage };

    if (filterByStatus) {
      params.status = filterByStatus;
      console.log(filterByStatus);
    }
    if (sortValue) {
      params = { ...params, ...sortValue };
    }
    try {
      const response = await orderAPI.getAllOrder(params);
      setOrders(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateOder = async (id, data) => {
    try {
      await orderAPI.updaterOrder(id, data);
      await getAllOrder();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllOrder();
  }, [currentPage, limitPerPage, filterByStatus, sortValue]);

  return (
    <PageLayout title="Đơn hàng">
      <Fillter
        orders={orders}
        handleUpdateOder={handleUpdateOder}
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
      <OrderTable
        orders={orders}
        handleUpdateOder={handleUpdateOder}
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
    </PageLayout>
  );
}
