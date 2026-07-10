import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const verifyEmail = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/forgot-password", { email });

      navigate("/reset-password", {
        state: { email }
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{maxWidth:"400px"}}>
        <h3>Forgot Password</h3>

        <form onSubmit={verifyEmail}>
          <input
            className="form-control mb-3"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;