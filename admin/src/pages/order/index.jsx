import { useState, useEffect } from "react";
import PageLayout from "../../components/layout/pageLayout";
import Fillter from "../../components/orders/Fillter";
import OrderTable from "../../components/orders/OrderTable";
import orderAPI from "../../api/orderAPI";
export default function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const response = await orderAPI.getAllOrder();
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllOrder();
  }, []);

  return (
    <PageLayout title="Đơn hàng">
      <Fillter />
      <OrderTable orders={orders} />
    </PageLayout>
  );
}
