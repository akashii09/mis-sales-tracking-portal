import { useEffect, useState } from "react";
import API from "../services/api";

function Regions() {

  const [regions, setRegions] = useState([]);

  const [form, setForm] = useState({
    RegionName: "",
    Zone: "",
    State: "",
    City: ""
  });

  const [editingId, setEditingId] = useState(null);

  const fetchRegions = async () => {
    try {
      const res = await API.get("/region");
      setRegions(res.data);
    } catch {
      alert("Failed to load Regions");
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {
        await API.put(`/region/${editingId}`, form);
        alert("Region Updated");
      } else {
        await API.post("/region/add", form);
        alert("Region Added");
      }

      setForm({
        RegionName: "",
        Zone: "",
        State: "",
        City: ""
      });

      setEditingId(null);

      fetchRegions();

    } catch (err) {
      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  const editRegion = (r) => {

    setEditingId(r.RegionID);

    setForm({
      RegionName: r.RegionName,
      Zone: r.Zone,
      State: r.State,
      City: r.City
    });

  };

  const deleteRegion = async (id) => {

    if (!window.confirm("Delete Region?")) return;

    await API.delete(`/region/${id}`);

    fetchRegions();

  };

  return (

    <div className="container mt-4">

      <h2>Region Master</h2>

      <form className="card p-3 mb-4" onSubmit={handleSubmit}>

        <div className="row">

          <div className="col">
            <input
              className="form-control"
              placeholder="Region Name"
              value={form.RegionName}
              onChange={(e) =>
                setForm({
                  ...form,
                  RegionName: e.target.value
                })
              }
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Zone"
              value={form.Zone}
              onChange={(e) =>
                setForm({
                  ...form,
                  Zone: e.target.value
                })
              }
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="State"
              value={form.State}
              onChange={(e) =>
                setForm({
                  ...form,
                  State: e.target.value
                })
              }
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="City"
              value={form.City}
              onChange={(e) =>
                setForm({
                  ...form,
                  City: e.target.value
                })
              }
            />
          </div>

          <div className="col">

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
            <th>Region</th>
            <th>Zone</th>
            <th>State</th>
            <th>City</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {regions.map((r) => (

            <tr key={r.RegionID}>

              <td>{r.RegionID}</td>
              <td>{r.RegionName}</td>
              <td>{r.Zone}</td>
              <td>{r.State}</td>
              <td>{r.City}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editRegion(r)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteRegion(r.RegionID)}
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

export default Regions;