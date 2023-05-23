import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/pageLayout";
import Filter from "../../components/orders/Fillter";
import OrderTable from "../../components/orders/OrderTable";
import orderAPI from "../../api/orderAPI";
import Bill from "../../components/orders/Bill";
// import useDebounce from "../../hooks/useDebounce";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [billData, setBillData] = useState();
  const [isShowBill, setIsShowBill] = useState(false);
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

  const handleShowBill = (item) => {
    setIsShowBill(!isShowBill);
    setBillData(item);
  };
  useEffect(() => {
    getAllOrder();
  }, [currentPage, limitPerPage, filterByStatus, sortValue]);

  return (
    <PageLayout title="Đơn hàng">
      <Filter
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
        handleShowBill={handleShowBill}
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
      {isShowBill && <Bill data={billData} close={handleShowBill} />}
    </PageLayout>
  );
}
