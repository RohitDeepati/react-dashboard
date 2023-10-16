import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card } from "antd";
import { getRevenue } from "../../API/Api";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DashBoardPieChart = () => {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });
      const backgroundColors = [
        "rgba(255, 0, 0, 1)",
        "rgba(0, 255, 0, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(255, 255, 0, 1)",
        "rgba(255, 0, 255, 1)",
        "rgba(0, 255, 255, 1)",
        "rgba(128, 0, 0, 1)",
        "rgba(0, 128, 0, 1)",
        "rgba(0, 0, 128, 1)",
        "rgba(128, 128, 0, 1)",
        "rgba(128, 0, 128, 1)",
        "rgba(0, 128, 128, 1)",
      ];

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Monthly Revenue",
            data: data,
            backgroundColor: backgroundColors,
          },
        ],
      };

      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Monthly Revenue",
      },
    },
  };

  return (
    <Card className="pie-chart-card" style={{ width: 350, height: 350 }}>
      <Doughnut data={revenueData} options={options} />
    </Card>
  );
};
