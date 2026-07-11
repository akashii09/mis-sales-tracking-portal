import { useEffect, useState } from "react";
import API from "../services/api";

function Users() {

    const [users, setUsers] = useState([]);

    const [form, setForm] = useState({
        Username: "",
        Email: "",
        Password: "",
        Role: "Sales Executive"
    });

    const [editingId, setEditingId] = useState(null);

    const fetchUsers = async () => {

        try {

            const res = await API.get("/users/all");

            setUsers(res.data);

        } catch (err) {

            console.error(err);

            alert("Failed to load users");

        }

    };

    useEffect(() => {

        fetchUsers();

    },
    
[]);

//add user function
const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (editingId) {

            await API.put(`/users/update/${editingId}`, {
                Username: form.Username,
                Email: form.Email,
                Role: form.Role
            });

            alert("User updated successfully");

        } else {

            await API.post("/users/add", form);

            alert("User created successfully");

        }

        setForm({
            Username: "",
            Email: "",
            Password: "",
            Role: "Sales Executive"
        });

        setEditingId(null);

        fetchUsers();

    } catch (err) {

        alert(err.response?.data?.message || "Operation failed");
    }

};
//delete
const handleDelete = async (id) => {

    if (!window.confirm("Delete this user?"))
        return;

    try {

        await API.put(`/users/delete/${id}`);

        fetchUsers();

    } catch (err) {

        alert("Delete failed");

    }

};
//edit
const handleEdit = (user) => {

    setEditingId(user.UserID);

    setForm({

        Username: user.Username,

        Email: user.Email,

        Password: "",

        Role: user.Role

    });

};
return (

<div className="container mt-4">

<h2 className="mb-4">
User Management
</h2>

<form
onSubmit={handleSubmit}
className="card p-3 mb-4 shadow">

<div className="row">

<div className="col-md-3">

<input
className="form-control"
placeholder="Username"
value={form.Username}
onChange={(e)=>
setForm({...form,Username:e.target.value})
}
/>

</div>

<div className="col-md-3">

<input
className="form-control"
placeholder="Email"
type="email"
value={form.Email}
onChange={(e)=>
setForm({...form,Email:e.target.value})
}
/>

</div>

<div className="col-md-2">

<input
className="form-control"
placeholder="Password"
type="password"
value={form.Password}
onChange={(e)=>
setForm({...form,Password:e.target.value})
}
/>

</div>

<div className="col-md-2">

<select
className="form-select"
value={form.Role}
onChange={(e)=>
setForm({...form,Role:e.target.value})
}
>

<option>Admin</option>

<option>Manager</option>

<option>Sales Executive</option>

<option>Viewer</option>

</select>

</div>

<div className="col-md-2">

<button
className="btn btn-primary w-100">

{editingId ? "Update" : "Add"}

</button>

</div>

</div>

</form>

<table className="table table-bordered table-hover shadow">

<thead className="table-dark">

<tr>

<th>ID</th>

<th>Username</th>

<th>Email</th>

<th>Role</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{users.map(user=>(

<tr key={user.UserID}>

<td>{user.UserID}</td>

<td>{user.Username}</td>

<td>{user.Email}</td>

<td>{user.Role}</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>handleEdit(user)}
>

Edit

</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>handleDelete(user.UserID)}
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

export default Users;