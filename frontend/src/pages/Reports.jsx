import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {

  const [data, setData] = useState([]);
  console.log("REPORT DATA =", data);
  useEffect(() => {

    axios
      .get("http://localhost:4000/api/reports/achievement-report", {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
const exportExcel = () => {

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Achievement Report"
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array"
      }
    );

  const fileData =
    new Blob(
      [excelBuffer],
      {
        type:
        "application/octet-stream"
      }
    );

  saveAs(
    fileData,
    "Achievement_Report.xlsx"
  );
};

const exportPDF = () => {

  const doc = new jsPDF();

  doc.text(
    "Achievement Report",
    14,
    15
  );

  autoTable(doc, {

    head: [[
      "Sales Person",
      "Product",
      "Target Qty",
      "Achievement Qty"
    ]],

    body: data.map(row => [

      row.SalesPerson,

      row.Product,

      row.TargetQty,

      row.AchQty

    ])

  });

  doc.save(
    "Achievement_Report.pdf"
  );
};
  return (
    <div>

      <h1>Reports</h1>
      <button onClick={exportExcel}>Export Excel</button>
      <button
  onClick={exportPDF}
  style={{ marginLeft: "10px" }}
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
          </tr>
        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr key={index}>

              <td>{row.SalesPerson}</td>

              <td>{row.Product}</td>

              <td>{row.TargetQty}</td>

              <td>{row.AchQty}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Reports;