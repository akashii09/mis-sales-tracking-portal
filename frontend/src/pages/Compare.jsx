import { useEffect, useState } from "react";
import API from "../services/api";

function Compare() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCompare();
  }, []);

  const fetchCompare = async () => {
    try {
      const res = await API.get("/achievement/compare");
      setData(res.data);
    } catch {
      alert("Failed to load comparison");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Target vs Achievement</h2>

      <table className="table table-bordered">

        <thead className="table-dark">
          <tr>
            <th>Sales Person</th>
            <th>Product</th>
            <th>Target Qty</th>
            <th>Achievement Qty</th>
            <th>Remaining</th>
          </tr>
        </thead>

        <tbody>

          {data.map((d,index)=>(
            <tr key={index}>
              <td>{d.SalesPerson}</td>
              <td>{d.Product}</td>
              <td>{d.TargetQty}</td>
              <td>{d.AchievementQty}</td>
              <td>{d.RemainingTarget}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Compare;