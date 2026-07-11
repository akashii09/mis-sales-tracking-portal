import { useEffect, useState } from "react";
import API from "../services/api";

function SalesPersons() {
  const [salesPersons, setSalesPersons] = useState([]);

  const [form, setForm] = useState({
    SP_Code: "",
    Name: "",
    Email: "",
    RegionID: "",
    ManagerID: ""
  });

  const [editingId, setEditingId] = useState(null);

  const fetchSalesPersons = async () => {
    try {
      const res = await API.get("/salesperson");
      setSalesPersons(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load Sales Persons");
    }
  };

  useEffect(() => {
    fetchSalesPersons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/salesperson/${editingId}`, form);
        alert("Sales Person Updated");
      } else {
        await API.post("/salesperson/add", form);
        alert("Sales Person Added");
      }

      setForm({
        SP_Code: "",
        Name: "",
        Email: "",
        RegionID: "",
        ManagerID: ""
      });

      setEditingId(null);
      fetchSalesPersons();

    } catch (err) {
      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  const editSalesPerson = (sp) => {
    setEditingId(sp.SP_ID);

    setForm({
      SP_Code: sp.SP_Code,
      Name: sp.Name,
      Email: sp.Email,
      RegionID: sp.RegionID,
      ManagerID: sp.ManagerID || ""
    });
  };

  const deleteSalesPerson = async (id) => {
    if (!window.confirm("Delete Sales Person?")) return;

    try {
      await API.delete(`/salesperson/${id}`);
      alert("Deleted Successfully");
      fetchSalesPersons();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Sales Persons Module</h2>

      <form className="card p-3 mb-4" onSubmit={handleSubmit}>
        <div className="row g-2">

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="SP Code"
              value={form.SP_Code}
              onChange={(e) =>
                setForm({ ...form, SP_Code: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Name"
              value={form.Name}
              onChange={(e) =>
                setForm({ ...form, Name: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Email"
              value={form.Email}
              onChange={(e) =>
                setForm({ ...form, Email: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Region ID"
              value={form.RegionID}
              onChange={(e) =>
                setForm({ ...form, RegionID: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Manager ID"
              value={form.ManagerID}
              onChange={(e) =>
                setForm({ ...form, ManagerID: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>

        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Manager</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {salesPersons.map((sp) => (
            <tr key={sp.SP_ID}>
              <td>{sp.SP_ID}</td>
              <td>{sp.SP_Code}</td>
              <td>{sp.Name}</td>
              <td>{sp.Email}</td>
              <td>{sp.RegionID}</td>
              <td>{sp.ManagerID || "-"}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editSalesPerson(sp)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteSalesPerson(sp.SP_ID)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default SalesPersons;