import {Link} from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Auth.css";
function PatientSignup(){

    const navigate = useNavigate();

    const[profilePhoto , setProfilePhoto] = useState(null);
    const[form , setForm] = useState({
        name : "",
        phone : "",
        age : "",
        historyIllness : "",
        historySurgery : "",
        email : "",
        password : "",
        profilePhoto : null
    })
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = new FormData();

        data.append("name", form.name);
        data.append("email", form.email);
        data.append("password", form.password);
        data.append("historyIllness", form.historyIllness);
        data.append("historySurgery", form.historySurgery);
        data.append("age", form.age);

        data.append("profile", form.profilePhoto);

        console.log(form);
        try{
            const res = await axios.post("http://localhost:5000/patient/register",data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            if(res.data.success){
                alert("Patient signup successful")
                navigate("/");
            }
        }
        catch(err){
            console.log(err);
            alert("Error in patient signup")
        }
    }

    return(
            <div className="main-container">
                <h1>Patient Signup</h1>
                {profilePhoto && (
                    <img 
                    src ={URL.createObjectURL(profilePhoto)}
                    alt="profile preview"
                    className="image"/>
                )}
                <form className="form-container" onSubmit={handleSubmit}>
                    <input type="text" onChange={e=>setForm({...form, name: e.target.value})} placeholder="Enter Your Name"/>
                    <input type="number" onChange={e=>setForm({...form, age: e.target.value})} placeholder="Enter Your Age"/>
                    <input type="number" onChange={e=>setForm({...form, phone: e.target.value})} placeholder="Enter Your Phone Number"/>
                    <input type="textarea" onChange={e=>setForm({...form, historyIllness: e.target.value})} placeholder="Enter your History of illness"/>
                    <input type="textarea" onChange={e=>setForm({...form, historySurgery: e.target.value})} placeholder="Enter your History of surgery"/>
                    <input type="text" onChange={e=>setForm({...form, email: e.target.value})} placeholder="Enter Your Email"/>
                    <input type="password" onChange={e=>setForm({...form, password: e.target.value})} placeholder="Enter Your Password"/>
                    <input type="file" accept="image/*" onChange={e=>{
                        setForm({...form, profilePhoto: e.target.files[0]});
                        setProfilePhoto(e.target.files[0]);
                    }} placeholder="Upload Profile Photo"></input>
                    <button>Signup</button>
                </form>
                <div className="auth-bottom">
                    <h3> Already have account ? <Link to = "/">Patient Login</Link></h3>
                </div>
        </div>
    )
}
export default PatientSignup;