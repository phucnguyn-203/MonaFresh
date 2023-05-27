import PageLayout from "../../components/layout/pageLayout";
import { StatsItem } from "../../components/dashboard/StatsItem";
import { ManageItem } from "../../components/dashboard/ManageItem";
import RecentOrders from "../recentOrders";

import IconTodayOrder from "../../components/icon/todayOrder/index";
import IconTotalOrder from "../../components/icon/totalOrder/index";
import IconCart from "../../components/icon/cart/index";
import IconPending from "../../components/icon/pending";
import IconTruck from "../../components/icon/truck";
import IconCheck from "../../components/icon/check";

export default function Dashboard() {
  return (
    <PageLayout title="Tổng quan">
      <div>
        <div className=" flex mb-8 gap-x-4">
          <StatsItem
            icon={<IconTodayOrder />}
            title="Đơn hàng hôm nay"
            value="100000"
            backgroundColor={"bg-teal-600"}
          />
          <StatsItem icon={<IconCart />} title="Tháng này" value="900000" backgroundColor={"bg-blue-500"} />
          <StatsItem
            icon={<IconTotalOrder />}
            title="Tổng đơn hàng"
            value="20000000000"
            backgroundColor={"bg-green-600"}
          />
        </div>
        <div className="flex gap-x-4">
          <ManageItem
            icon={<IconCart />}
            title="Tổng số đơn"
            value="295"
            backgroundColor={"bg-orange-100"}
            iconColor={"text-orange-500"}
          />
          <ManageItem
            icon={<IconPending />}
            title="Tổng số đơn"
            value="295"
            backgroundColor={"bg-blue-100"}
            iconColor={"text-blue-500"}
          />
          <ManageItem
            icon={<IconTruck />}
            title="Xử lý đơn hàng"
            value="1000"
            backgroundColor={"bg-teal-100"}
            iconColor={"text-teal-500"}
          />
          <ManageItem
            icon={<IconCheck />}
            title="Đã giao"
            value="295"
            backgroundColor={"bg-green-100"}
            iconColor={"text-green-500"}
          />
        </div>
      </div>
      <RecentOrders />
    </PageLayout>
  );
}
