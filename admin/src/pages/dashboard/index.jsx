import { useState, useEffect } from "react";
import { StatsItem } from "../../components/dashboard/StatsItem";
import { ManageItem } from "../../components/dashboard/ManageItem";
import PageLayout from "../../components/layout/pageLayout";
import RecentOrders from "../../components/dashboard/RecentOrders";
import TopSellingProductsChart from "../../components/dashboard/TopSellingProductsChart";
import ProfitChart from "../../components/dashboard/ProfitChart";
import {
  IconCustomer,
  IconProduct,
  IconOutOfStock,
  IconCart,
  IconPending,
  IconTruck,
  IconCheck,
  IconCash,
  IconExcel,
  IconDownload,
} from "../../components/icon";
import formatCurrency from "../../utils/formatCurrency";
import statisticAPI from "../../api/statisticAPI";

export default function Dashboard() {
  const [statistics, setStatistics] = useState({
    todayProfit: 0,
    totalCustomer: 0,
    totalProduct: 0,
    totalProductOutOfStock: 0,
    ordersStatistic: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          {
            data: { todayProfit },
          },
          {
            data: { totalCustomer },
          },
          {
            data: { totalProduct },
          },
          {
            data: { totalProductsOutofStock },
          },
          { data: orderStatistic },
        ] = await Promise.all([
          statisticAPI.getTodayProfit(),
          statisticAPI.getTotalCustomer(),
          statisticAPI.getTotalProduct(),
          statisticAPI.getTotalProductsOutofStock(),
          statisticAPI.getOrdersStatistic(),
        ]);

        setStatistics({
          todayProfit,
          totalCustomer,
          totalProduct,
          totalProductOutOfStock: totalProductsOutofStock,
          ordersStatistic: orderStatistic,
        });
      } catch (err) {
        console.error(err.response ? err.response.data.message : err.message);
      }
    };

    fetchData();
  }, []);

  const { todayProfit, totalCustomer, totalProduct, totalProductOutOfStock, ordersStatistic } = statistics;

  return (
    <PageLayout title="Tổng quan">
      <div className="mb-8 justify-end flex">
        <button>
          <div className="flex w-1/8 h-16 p-4 items-center border border-gray-200 rounded-lg bg-primary  ">
            <div className="bg-white flex justify-center p-2 mr-4 text-lg  rounded-full">
              <div className=" w-[30px] h-[30px]">
                <IconExcel />
              </div>
            </div>
            <div className="flex justify-between-center items-center">
              <p className="mb-1 text-sm font-medium text-white">Xuất Excel </p>
              <span className="ml-1 w-4 h-4 text-sm">
                <IconDownload />
              </span>
            </div>
          </div>
        </button>
      </div>

      <div className="flex mb-8 gap-x-4">
        <StatsItem
          icon={<IconCash />}
          title="Doanh thu hôm nay"
          value={formatCurrency(todayProfit)}
          backgroundColor="bg-green-600"
        />
        <StatsItem icon={<IconCustomer />} title="Số Khách Hàng" value={totalCustomer} backgroundColor="bg-teal-600" />
        <StatsItem icon={<IconProduct />} title="Số sản phẩm" value={totalProduct} backgroundColor="bg-blue-500" />
        <StatsItem
          icon={<IconOutOfStock />}
          title="Sản phẩm hết hàng"
          value={totalProductOutOfStock}
          backgroundColor="bg-red-500"
        />
      </div>
      <div className="flex gap-x-4">
        <ManageItem
          icon={<IconCart />}
          title="Tổng đơn hàng"
          value={ordersStatistic?.totalOrder || 0}
          backgroundColor="bg-orange-100"
          iconColor="text-orange-500"
        />
        <ManageItem
          icon={<IconPending />}
          title="Đơn hàng đang chờ "
          value={ordersStatistic?.totalOrderIsPending || 0}
          backgroundColor="bg-blue-100"
          iconColor="text-blue-500"
        />
        <ManageItem
          icon={<IconTruck />}
          title="Đơn hàng đang giao"
          value={ordersStatistic?.totalOrderOrderIsDelivering || 0}
          backgroundColor="bg-teal-100"
          iconColor="text-teal-500"
        />
        <ManageItem
          icon={<IconCheck />}
          title="Đơn hàng đã giao"
          value={ordersStatistic?.totalOrderHaveDelivered || 0}
          backgroundColor="bg-green-100"
          iconColor="text-green-500"
        />
      </div>
      <div className="mt-10">
        <div className="flex gap-x-5">
          <div className="w-1/2">
            <ProfitChart />
          </div>
          <div className="w-1/2">
            <TopSellingProductsChart />
          </div>
        </div>
        <RecentOrders />
      </div>
    </PageLayout>
  );
}
