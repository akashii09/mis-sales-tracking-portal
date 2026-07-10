import { useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function ResetPassword(){

const {state}=useLocation();

const navigate=useNavigate();

const [password,setPassword]=useState("");

const reset=async(e)=>{

e.preventDefault();

try{

await API.post("/auth/reset-password",{

Email:state.email,

NewPassword:password

});

alert("Password Updated");

navigate("/");

}catch(err){

alert(err.response?.data?.message);

}

};

return(

<div className="container mt-5">

<div className="card p-4 shadow mx-auto" style={{maxWidth:"400px"}}>

<h3>Reset Password</h3>

<form onSubmit={reset}>

<input

className="form-control mb-3"

type="password"

placeholder="New Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

<button className="btn btn-success w-100">

Reset Password

</button>

</form>

</div>

</div>

);

}

export default ResetPassword;