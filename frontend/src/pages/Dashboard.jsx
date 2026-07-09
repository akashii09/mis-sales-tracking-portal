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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("month");

  useEffect(() => {
    const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
Promise.all([
  axios.get(
    `https://mis-sales-tracking-backend-akashi-edevc7gkfkducede.centralindia-01.azurewebsites.net/api/dashboard/kpi?view=${view}`,
    config
  ),

  axios.get(
    "https://mis-sales-tracking-backend-akashi-edevc7gkfkducede.centralindia-01.azurewebsites.net/api/dashboard/product-contribution",
    config
  ),

  axios.get(
    "https://mis-sales-tracking-backend-akashi-edevc7gkfkducede.centralindia-01.azurewebsites.net/api/dashboard/trend",
    config
  ),

  axios.get(
    "https://mis-sales-tracking-backend-akashi-edevc7gkfkducede.centralindia-01.azurewebsites.net/api/dashboard/top-performers",
    config
  ),

  axios.get(
    "https://mis-sales-tracking-backend-akashi-edevc7gkfkducede.centralindia-01.azurewebsites.net/api/dashboard/bottom-performers",
    config
  ),
])

    .then(([kpiRes, productRes, trendRes, topRes, bottomRes]) => {
      setKpi(kpiRes.data);
      setProductData(productRes.data);
      setTrendData(trendRes.data);
      setTopPerformers(topRes.data);
      setBottomPerformers(bottomRes.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to load dashboard data");
      setLoading(false);
    });
}, [view]);

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
if (loading) {
  return <div className="loading">Loading Dashboard...</div>;
}

if (error) {
  return <div className="error">{error}</div>;
}
  return (
    <div>
      <h1>MIS Dashboard</h1><div style={{ marginBottom: "20px" }}>

      <button
onClick={() => setView("day")}
>
Day
</button>

<button
onClick={() => setView("week")}
style={{ marginLeft: "10px" }}
>
Week
</button>

<button
onClick={() => setView("month")}
style={{ marginLeft: "10px" }}
>
Month
</button>

</div>
      <hr />

      <h2>KPI Summary</h2>

      <div className="kpi-container">

  <div className="kpi-card">
    <h3>{view.toUpperCase()} Achievement</h3>
    <p>{kpi.achievement}</p>
  </div>

  <div className="kpi-card">
    <h3>Selected Achievement</h3>
    <p>{kpi.achievement}</p>
  </div>

  <div className="kpi-card">
    <h3>{view.toUpperCase()}  Target</h3>
    <p>{kpi.target}</p>
  </div>

  <div className="kpi-card">
    <h3>Achievement %</h3>
    <p>{kpi.achievementPercent}%</p>
  </div>

</div>

      <hr />

      <h2>Product Contribution</h2>

      <div className="chart-container">
        <Pie data={pieData} />
      </div>

      <hr />

      <h2>Sales Trend</h2>

      <div className="chart-container">
        <Line data={lineData} />
      </div>

      <hr />

      <h2>Top Performers</h2>
{topPerformers.length === 0 && (
  <p>No Data Available</p>
)}
      <table>
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
{bottomPerformers.length === 0 && (
  <p>No Data Available</p>
)}
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