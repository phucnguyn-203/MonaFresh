import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import statisticAPI from "../../../api/statisticAPI";

export default function TopSellingProducts() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getTopSellingProducts = async () => {
      try {
        const response = await statisticAPI.getTopSellingProducts();
        const topSellingProducts = response.data;
        const labels = topSellingProducts.map((item) => item.productName);
        const quantities = topSellingProducts.map((item) => item.totalQuantity);
        const chartData = {
          labels: labels,
          datasets: [
            {
              data: quantities,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#9C27B0"],
            },
          ],
        };

        setChartData(chartData);
      } catch (err) {
        console.log(err);
      }
    };
    getTopSellingProducts();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h1 className="mb-4 font-semibold text-gray-800">Những sản phẩm bán chạy</h1>
      <div>
        {chartData && (
          <Pie data={chartData} width={320} height={320} options={{ maintainAspectRatio: false, responsive: true }} />
        )}
      </div>
    </div>
  );
}
