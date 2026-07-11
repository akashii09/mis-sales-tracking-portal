import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    ProductCode: "",
    Name: "",
    Category: "",
    Unit: "Bottle"
  });

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product");
      setProducts(res.data);
    } catch (err) {
  console.log(err);
  console.log(err.response);
  alert(err.response?.data?.message || err.message);
}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await API.put(`/product/${editingId}`, form);

        alert("Product Updated");

      } else {

        await API.post("/product/add", form);

        alert("Product Added");
      }

      setForm({
        ProductCode: "",
        Name: "",
        Category: "",
        Unit: "Bottle"
      });

      setEditingId(null);

      fetchProducts();

    } catch (err) {

      alert(err.response?.data?.message || "Operation Failed");

    }
  };

  const editProduct = (p) => {

    setEditingId(p.ProductID);

    setForm({
      ProductCode: p.ProductCode,
      Name: p.Name,
      Category: p.Category,
      Unit: p.Unit
    });

  };

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete Product?")) return;

    await API.delete(`/product/${id}`);

    fetchProducts();

  };

  return (
    <div className="container mt-4">

      <h2>Product Master</h2>

      <form className="card p-3 mb-4" onSubmit={handleSubmit}>

        <div className="row">

          <div className="col">
            <input
              className="form-control"
              placeholder="Product Code"
              value={form.ProductCode}
              onChange={(e)=>setForm({...form,ProductCode:e.target.value})}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Product Name"
              value={form.Name}
              onChange={(e)=>setForm({...form,Name:e.target.value})}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Category"
              value={form.Category}
              onChange={(e)=>setForm({...form,Category:e.target.value})}
            />
          </div>

          <div className="col">

            <select
              className="form-select"
              value={form.Unit}
              onChange={(e)=>setForm({...form,Unit:e.target.value})}
            >

              <option>Bottle</option>

              <option>Case</option>

              <option>Crate</option>

            </select>

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

            <th>Code</th>

            <th>Name</th>

            <th>Category</th>

            <th>Unit</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map((p)=>(

            <tr key={p.ProductID}>

              <td>{p.ProductID}</td>

              <td>{p.ProductCode}</td>

              <td>{p.Name}</td>

              <td>{p.Category}</td>

              <td>{p.Unit}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={()=>editProduct(p)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={()=>deleteProduct(p.ProductID)}
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

export default Products;