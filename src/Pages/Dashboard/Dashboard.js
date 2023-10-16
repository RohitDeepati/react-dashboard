import {
  DollarOutlined,
  ShoppingOutlined,
  ExceptionOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  getCustomers,
  getInventory,
  getOrders,
  getRevenue,
} from "../../API/Api";
import "./dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DashBoardPieChart } from "./DashBoardPieChar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div>
        <h3>Dashboard</h3>
        <div className="dashboard-card">
          <DashboardCard
            className="box"
            icon={
              <DollarOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Inventory"}
            value={inventory}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "#800080",
                  backgroundColor: "rgb(221,160,221,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                }}
              />
            }
            title={"Orders"}
            value={orders}
          />
          <DashboardCard
            icon={
              <ExceptionOutlined
                style={{
                  color: "#7393B3",
                  backgroundColor: "rgba(115, 147, 179,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                }}
              />
            }
            title={"Customers"}
            value={customers}
          />
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255, 192, 203,0.25)",
                  borderRadius: 20,
                  fontSize: 30,
                  padding: 8,
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
          />
        </div>
        <div className="charts">
          <DashboardChart />
          <DashBoardPieChart />
        </div>
        <div>
          <div className="table-container">
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <div className="container">
      <Card
        className="card"
        // style={{ width: "200px", backgroundColor: "white", height: "150px" }}
      >
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    </div>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div>
        <Typography.Text>Recent Orders</Typography.Text>
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
            },
            {
              title: "Price",
              dataIndex: "discountedPrice",
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
        ></Table>
      </div>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
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

      setReveneuData(dataSource);
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
    <Card className="chart">
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}
