import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../../components/layout/pageLayout";
import CustomerOrderListTable from "../../../components/customer/CustomerOrderListTable";
import BillCustomer from "../../../components/customer/Bill/BillCustomerOrder/BillCustomer";
import orderAPI from "../../../api/orderAPI";
import Filter from "../../../components/customer/Filter";

export default function CustomerOrder() {
  const params = useParams();
  const userId = params.id;
  const [orders, setOrders] = useState([]);
  const [billData, setBillData] = useState();
  const [isShowBill, setIsShowBill] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [filterByStatus, setFilterByStatus] = useState("");
  const [sortValue, setSortValue] = useState("");

  const getOrdersByUserId = async (userId) => {
    let params = { page: currentPage, limit: limitPerPage };
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

  const handleUpdateOder = async (id, data) => {
    try {
      await orderAPI.updaterOrder(id, data);
      await getOrdersByUserId(userId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowBill = (item) => {
    setIsShowBill(!isShowBill);
    setBillData(item);
  };

  useEffect(() => {
    getOrdersByUserId(userId);
  }, [userId, currentPage, limitPerPage, filterByStatus, sortValue]);

  return (
    <PageLayout title="Đơn hàng của khách hàng">
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
      <CustomerOrderListTable
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
      {isShowBill && <BillCustomer data={billData} close={handleShowBill} />}
    </PageLayout>
  );
}
