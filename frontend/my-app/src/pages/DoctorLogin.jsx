import { Link } from "react-router-dom";
import "../styles/Auth.css";
import axios from "axios";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorLogin(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/doctor/login",{
            email,
            password
        })
        if(res.data.success){
            alert("Doctor login successfull")
            navigate("/doctor/dashboard", {state: {doctor : res.data.doctor}});
        }
        }
        catch(err){
            console.log(err);
            alert("Error in doctor login (frontend)");
        }
    }

    return(
        <div className="main-container">
            <div className="form-container">
                <h1>Doctor Login</h1>
                <input type="text"  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"/>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"/>
                <button onClick={handleLogin}>Login</button>
                <div className="auth-bottom">
                    <h3>Don't have account ? <Link to = "/doctor/signup">Doctor Signup</Link></h3>
                    <h3>Patient ? <Link to = "/">Patient Login</Link></h3>
                </div>
            </div>
        </div>
    )
}
export default DoctorLogin;