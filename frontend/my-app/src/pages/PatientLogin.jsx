import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import "../styles/Auth.css";
import axios from "axios";
import API_URL from "../config/api";

function PatientLogin(){

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post(`${API_URL}/patient/login`,{
            email,
            password
        })
        if(res.data.success){
            alert("Patient login successfull")
            navigate("/patient/dashboard", {state: {patient : res.data.patient}});
        }
        }
        catch(err){
            console.log(err);
            alert("Error in patient login (frontend)");
        }
    }

    return(
        <div className="main-container">
            <div className="form-container">
                <h1>Patient Login</h1>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Your Email"/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Your Password"/>
                <button onClick={handleLogin}>Login</button>
                <div className="auth-bottom">
                    <h3>Don't have account ? <Link to = "/patient/signup">Patient Signup</Link></h3>
                    <h3>Doctor ? <Link to = "/doctor/login">Doctor Login</Link></h3>
                </div>
            </div>
        </div>
    )
}

export default PatientLogin;