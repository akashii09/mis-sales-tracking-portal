import { useEffect, useState } from "react";
import axios from "axios";

import { Pie, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function Dashboard() {
  const [kpi, setKpi] = useState({});
  const [productData, setProductData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [bottomPerformers, setBottomPerformers] = useState([]);

  useEffect(() => {
    // KPI
    axios
      .get("http://localhost:4000/api/dashboard/kpi")
      .then((res) => setKpi(res.data))
      .catch((err) => console.log(err));

    // Product Contribution
    axios
      .get("http://localhost:4000/api/dashboard/product-contribution")
      .then((res) => setProductData(res.data))
      .catch((err) => console.log(err));

    // Trend
    axios
      .get("http://localhost:4000/api/dashboard/trend")
      .then((res) => setTrendData(res.data))
      .catch((err) => console.log(err));

    // Top Performers
    axios
      .get("http://localhost:4000/api/dashboard/top-performers")
      .then((res) => setTopPerformers(res.data))
      .catch((err) => console.log(err));

    // Bottom Performers
    axios
      .get("http://localhost:4000/api/dashboard/bottom-performers")
      .then((res) => setBottomPerformers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const pieData = {
    labels: productData.map((item) => item.Name),
    datasets: [
      {
        label: "Sales",
        data: productData.map((item) =>
          Number(item.totalSales)
        ),
      },
    ],
  };

  const lineData = {
    labels: trendData.map((item) =>
      new Date(item.saleDate).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Sales Trend",
        data: trendData.map((item) =>
          Number(item.totalSales)
        ),
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MIS Dashboard</h1>

      <hr />

      <h2>KPI Summary</h2>

      <div>
        <h3>Today Achievement: {kpi.todayAchievement}</h3>
        <h3>MTD Achievement: {kpi.mtdAchievement}</h3>
        <h3>MTD Target: {kpi.mtdTarget}</h3>
        <h3>Achievement %: {kpi.achievementPercent}</h3>
      </div>

      <hr />

      <h2>Product Contribution</h2>

      <div style={{ width: "500px" }}>
        <Pie data={pieData} />
      </div>

      <hr />

      <h2>Sales Trend</h2>

      <div style={{ width: "700px" }}>
        <Line data={lineData} />
      </div>

      <hr />

      <h2>Top Performers</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Sales</th>
          </tr>
        </thead>

        <tbody>
          {topPerformers.map((person, index) => (
            <tr key={index}>
              <td>{person.Name}</td>
              <td>{person.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>Bottom Performers</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Sales</th>
          </tr>
        </thead>

        <tbody>
          {bottomPerformers.map((person, index) => (
            <tr key={index}>
              <td>{person.Name}</td>
              <td>{person.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;