import PageLayout from "../../../components/layout/pageLayout";
import CustomerOrderListTable from "../../../components/customer/CustomerOrderListTable";

export default function CustomerOrder() {
  return (
    <PageLayout title="Đơn hàng của khách hàng">
      <CustomerOrderListTable />
    </PageLayout>
  );
}
