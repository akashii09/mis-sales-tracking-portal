import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

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
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
   localStorage.clear();
   navigate("/");
};

  useEffect(() => {
  Promise.all([
  API.get(`/dashboard/kpi?view=${view}`),

  API.get("/dashboard/product-contribution"),

  API.get("/dashboard/trend"),

  API.get("/dashboard/top-performers"),

  API.get("/dashboard/bottom-performers"),
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
      backgroundColor: [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#dc3545",
        "#6f42c1",
        "#20c997",
        "#fd7e14",
        "#6610f2",
        "#198754",
        "#0dcaf0",
      ],

      borderColor: "#ffffff",
      borderWidth: 2,
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
  return(
     <div className="text-center mt-5">
       <div 
       className="spinner-border text-primary"
       role="status"
      > 
      <span className="visually-hidden">
    Loading...
    </span>
    </div>


 <p className="mt-3"> Loading Dashboard...</p>
</div>
);
}
if (error) {
  return(
     <div className="alert alert-danger mt-5">{error}</div>
  );
}

return (
  <div className="container py-4">

    <h2 className="text-center text-primary fw-bold mb-4">
      📊 MIS Sales Tracking Dashboard
    </h2>
    <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">

  
      <Link
  to="/dashboard"
  className="btn btn-primary"
>
  Dashboard
</Link>

{role === "Admin" && (
  <>
    <Link to="/users" className="btn btn-dark">
      Users
    </Link>

    <Link to="/products" className="btn btn-secondary">
      Products
    </Link>

    <Link to="/salesperson" className="btn btn-info">
      Sales Persons
    </Link>

    <Link to="/regions" className="btn btn-success">
      Regions
    </Link>
  </>
)}

{(role === "Admin" || role === "Manager" || role === "Sales Executive") && (
  <Link to="/achievement" className="btn btn-info">
    Achievement
  </Link>
)}

{(role === "Admin" || role === "Manager") && (
  <Link to="/reports" className="btn btn-success">
    Achievement Report
  </Link>
)}

{role === "Admin" && (
  <Link to="/variance" className="btn btn-warning">
    Variance Report
  </Link>
)}

<button
  className="btn btn-danger"
  onClick={logout}
>
  Logout
</button>

{(role === "Admin" || role === "Manager") && (
  <div className="card shadow mt-4">
    <div className="card-body text-center">
      <h5 className="mb-3">Target vs Achievement</h5>

      <Link to="/compare" className="btn btn-success">
        View Report
      </Link>
    </div>
  </div>
)}
    </div>

    <div className="text-center mb-4">
      <button
        className={`btn ${
          view === "day" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setView("day")}
      >
        Day
      </button>

      <button
        className={`btn ms-2 ${
          view === "week" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setView("week")}
      >
        Week
      </button>

      <button
        className={`btn ms-2 ${
          view === "month" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setView("month")}
      >
        Month
      </button>
    </div>

    <div className="row g-4 mb-4">

      <div className="col-md-3">
        <div className="card shadow text-center h-100">
          <div className="card-body">
            <h6 className="text-muted">Achievement</h6>
              
            <h2 className= "fw-bold text-dark">
               {Number(kpi.achievement || 0).toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow text-center h-100">
          <div className="card-body">
            <h6 className="text-muted">Target</h6>

            <h2 className="fw-bold text-dark">
              {Number(kpi.target|| 0).toLocaleString()}

            </h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow text-center h-100">
          <div className="card-body">
            <h6 className="text-muted">Achievement %</h6>
            <h2 className="fw-bold text-dark">
  {kpi.target > 0
    ? `${Number(kpi.achievementPercent).toFixed(2)}%`
    : "N/A"}
</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow text-center h-100">
          <div className="card-body">
            <h6 className="text-muted">Current View</h6>
            <h3>{view.toUpperCase()}</h3>
          </div>
        </div>
      </div>

    </div>

    <div className="card shadow mb-4">
      <div className="card-body">

        <h4 className="text-center mb-3">
          Product Contribution
        </h4>

        <div
         style={{
          maxWidth:"450px",
          margin:"auto",
         }}
         >
        <Pie 
           data={pieData}
           options={{
              plugins: {
                 legend: {
                    position: "bottom",
            },
        },
    }} />
      </div>

    </div>
    </div>

    <div className="card shadow mb-4">
      <div className="card-body">
        <h4 className="text-center mb-3">
          Sales Trend
        </h4>
        <div
          style={{
            maxWidth: "450px",
            margin: "auto",
          }}
          >
        <Line data={lineData} />
      </div>

    </div>
    </div>

    <div className="card shadow mb-4">
      <div className="card-body">
        <h4>Top Performers</h4>

        {topPerformers.length === 0 ? (
          <p>No Data Available</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-primary">
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
        )}
      </div>
    </div>

    <div className="card shadow">
      <div className="card-body">
        <h4>Bottom Performers</h4>

        {bottomPerformers.length === 0 ? (
          <p>No Data Available</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-danger">
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
        )}
      </div>
    </div>

  </div>
);

}

export default Dashboard;