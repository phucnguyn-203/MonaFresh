import PageLayout from "../../components/layout/pageLayout";
import Fillter from "../../components/orders/Fillter";
import OrderTable from "../../components/orders/OrderTable";

export default function Order() {
    return (
        <PageLayout title="Đơn hàng">
            <Fillter />
            <OrderTable />
        </PageLayout>
    );
}
