import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../../../components/layout/pageLayout";
import CustomerOrderListTable from "../../../components/customer/CustomerOrderListTable";
import orderAPI from "../../../api/orderAPI";

export default function CustomerOrder() {
  const [order, setOrder] = useState("");
  const params = useParams();
  const userId = params.id;

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

  return (
    <PageLayout title="Đơn hàng của khách hàng">
      <CustomerOrderListTable order={order} />
    </PageLayout>
  );
}
