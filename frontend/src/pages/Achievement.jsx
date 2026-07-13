import { useEffect, useState } from "react";
import API from "../services/api";

function Achievement() {
  const [achievements, setAchievements] = useState([]);

  const [form, setForm] = useState({
    SP_ID: "",
    ProductID: "",
    SaleDate: "",
    AchQty: "",
    AchValue: "",
    CustomerName: "",
    Remarks: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchAchievements = async () => {
    try {
      const res = await API.get("/achievement/all");
      setAchievements(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load Achievements");
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/achievement/update/${editingId}`, form);
        alert("Achievement Updated");
      } else {
        await API.post("/achievement/add", form);
        alert("Achievement Added");
      }

      setForm({
        SP_ID: "",
        ProductID: "",
        SaleDate: "",
        AchQty: "",
        AchValue: "",
        CustomerName: "",
        Remarks: "",
      });

      setEditingId(null);
      fetchAchievements();

    } catch (err) {
      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Achievement Module</h2>

      <form className="card p-3 mb-4" onSubmit={handleSubmit}>

        <div className="row g-2">

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="SP ID"
              value={form.SP_ID}
              onChange={(e) =>
                setForm({ ...form, SP_ID: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Product ID"
              value={form.ProductID}
              onChange={(e) =>
                setForm({ ...form, ProductID: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={form.SaleDate}
              onChange={(e) =>
                setForm({ ...form, SaleDate: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Qty"
              value={form.AchQty}
              onChange={(e) =>
                setForm({ ...form, AchQty: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Value"
              value={form.AchValue}
              onChange={(e) =>
                setForm({ ...form, AchValue: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>

        </div>

        <div className="row mt-2">

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Customer Name"
              value={form.CustomerName}
              onChange={(e) =>
                setForm({ ...form, CustomerName: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Remarks"
              value={form.Remarks}
              onChange={(e) =>
                setForm({ ...form, Remarks: e.target.value })
              }
            />
          </div>

        </div>

      </form>

      <table className="table table-bordered">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Sales Person</th>
            <th>Product</th>
            <th>Date</th>
            <th>Qty</th>
            <th>Value</th>
            <th>Customer</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>

          {achievements.map((a) => (
            <tr key={a.AchID}>
              <td>{a.AchID}</td>
              <td>{a.SalesPerson}</td>
              <td>{a.Product}</td>
              <td>{a.SaleDate?.split("T")[0]}</td>
              <td>{a.AchQty}</td>
              <td>{a.AchValue}</td>
              <td>{a.CustomerName}</td>
              <td>{a.Remarks}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Achievement;