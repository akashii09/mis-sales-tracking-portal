import { useEffect, useState } from "react";
import axios from "axios";

function VarianceReport() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios
      .get("https://mis-sales-tracking-backend-akashi-edevc7gkfkducede.centralindia-01.azurewebsites.net/api/reports/variance-report")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <h1>Variance Report</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Sales Person</th>
            <th>Product</th>
            <th>Target Qty</th>
            <th>Achievement Qty</th>
            <th>Variance</th>
          </tr>
        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr key={index}>

              <td>{row.SalesPerson}</td>

              <td>{row.Product}</td>

              <td>{row.TargetQty}</td>

              <td>{row.AchievementQty}</td>

              <td>{row.Variance}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default VarianceReport;