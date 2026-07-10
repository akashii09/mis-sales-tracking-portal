import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: email.trim(),
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ 
        minHeight: "100vh" ,
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <div
        className="card border-0 shadow p-4"
        style={{ 
          width: "400px" ,
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-2">
          MIS Sales Tracking Portal
        </h2>
        <p
           className="text-center text-muted mb-4"
           style={{ fontsize: "14px"}}
           > Login to continue
           </p>

        <form onSubmit={login}>
          <div className="mb-3">
            <label>Email</label>

            <input
              disabled={loading}
              className="form-control py-2"
              placeholder= "Enter your email"
              autoComplete= "email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              disabled={loading}
              className="form-control py-2"
              placeholder="Enter your password"
              autoComplete= "current-password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;