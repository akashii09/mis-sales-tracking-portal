import { useEffect, useState } from "react";
import API from "../services/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";

function VarianceReport() {

  const [data, setData] = useState([]);

  useEffect(() => {
    API.get(
        "/reports/variance-report")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 
  []);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Variance Report"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "Variance_Report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Variance Report", 14, 15);

    autoTable(doc, {
      startY: 25,

      head: [[
        "Sales Person",
        "Product",
        "Target Qty",
        "Achievement Qty",
        "Variance",
      ]],

      body: data.map((row) => [
        row.SalesPerson,
        row.Product,
        row.TargetQty,
        row.AchievementQty,
        row.Variance,
      ]),
    });

    doc.save("Variance_Report.pdf");
  };

  return (
    <div>

      <h1>Variance Report</h1>
      <div className="mb-3">

  <Link
    to="/dashboard"
    className="btn btn-primary me-2"
  >
    Dashboard
  </Link>

</div>
      <button 
        className="btn btn-success me-2"
        onClick={exportExcel}>
        Export Excel
      </button>

      <button
        className="btn btn-success me-2"
        onClick={exportPDF}
        style={{ marginLeft: "10px" ,
          backgroundColor: "#dc3545"
        }}
      >
        Export PDF
      </button>

      <hr />

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