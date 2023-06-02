import React, { useState, useEffect } from "react";

import PageLayout from "../../components/layout/pageLayout";
import {
  IconTotalProduct,
  IconTotalOrderReport,
  IconStaffReport,
  IconIncome,
  IconOutOfStockReport,
  IconOrderCancel,
} from "../../components/icon";
import SellingProductTable from "../../components/report/SellingProductTable";
import FriendlyCustomerTable from "../../components/report/friendlyCustomerTable";

export default function Report() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);

  return (
    <PageLayout title="Báo cáo chi tiết">
      <div className="flex gap-8 justify-around items-center mb-[30px]">
        <div className="w-[30%] h-[70px] flex items-center bg-white py-[10px] shadow-md rounded-lg">
          <div className="h-full w-1/3">
            <IconIncome />
          </div>
          <div className="w-2/3 font-semibold">
            <h1 className="text-[red] text-[18px]">Tổng doanh thu</h1>
            <h1>200</h1>
          </div>
        </div>
        <div className="w-[30%] h-[70px] flex items-center bg-white py-[10px] shadow-md rounded-lg">
          <div className="h-full w-1/3">
            <IconStaffReport />
          </div>
          <div className="w-2/3 font-semibold">
            <h1 className="text-[red] text-[18px]">Số nhân viên</h1>
            <h1>200</h1>
          </div>
        </div>
        <div className="w-1/3 h-[70px] flex items-center bg-white py-[10px] shadow-md rounded-lg">
          <div className="h-full w-1/3">
            <IconOrderCancel />
          </div>
          <div className="w-2/3 font-semibold">
            <h1 className="text-[red] text-[18px]">Đơn hàng bị huỷ</h1>
            <h1>10000</h1>
          </div>
        </div>
        <div className="w-1/3 h-[70px] flex items-center bg-white py-[10px] shadow-md rounded-lg">
          <div className="h-full w-1/3">
            <IconOrderCancel />
          </div>
          <div className="w-2/3 font-semibold">
            <h1 className="text-[red] text-[18px]">Đơn hàng bị trả lại</h1>
            <h1>10000</h1>
          </div>
        </div>
      </div>

      <div className="mt-[50px] p-[20px] bg-white shadow-lg">
        <h1 className="font-medium mb-[20px]">Sản phẩm đã bán ra</h1>
        <SellingProductTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPageCount={totalPageCount}
        />
      </div>

      <div className="mt-[50px] p-[20px] bg-white shadow-lg">
        <h1 className="font-medium mb-[20px]">Khách hàng thân thiết</h1>
        <FriendlyCustomerTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPageCount={totalPageCount}
        />
      </div>
    </PageLayout>
  );
}
