import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/pageLayout";
import orderAPI from "../../api/orderAPI";
import Bill from "../../components/orders/Bill";
import RecentOrdersTable from "../../components/recentOrders";
// import useDebounce from "../../hooks/useDebounce";

export default function RecentOrders() {
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
  }, [currentPage, limitPerPage]);

  return (
    <PageLayout title="Đơn hàng gần đây">
      <RecentOrdersTable
        orders={orders}
        handleUpdateOder={handleUpdateOder}
        handleShowBill={handleShowBill}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
      />
      {isShowBill && <Bill data={billData} close={handleShowBill} />}
    </PageLayout>
  );
}
