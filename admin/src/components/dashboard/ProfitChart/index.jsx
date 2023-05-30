import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import statisticAPI from "../../../api/statisticAPI";

export default function ProfitChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getProfitData = async () => {
      try {
        const response = await statisticAPI.getProfitInMonth();
        const profitData = response.data;

        const labels = Object.keys(profitData);
        const data = Object.values(profitData);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "Lợi Nhuận",
              data: data,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    getProfitData();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h1 className="mb-4 font-semibold text-gray-800">Doanh thu theo từng tháng</h1>
      <div>
        {chartData && (
          <Bar
            data={chartData}
            width={320}
            height={320}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
