import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorSignup(){
    const navigate = useNavigate();

    const[profilePhoto , setProfilePhoto] = useState(null);
    const[form , setForm] = useState({
        name : "",
        phone : "",
        speciality : "",
        experience : "",
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
        data.append("phone", form.phone);
        data.append("speciality", form.speciality);
        data.append("experience", form.experience);
        data.append("role", form.role);

        data.append("profile", form.profilePhoto);

        console.log(form);
        try{
            const res = await axios.post("http://localhost:5000/doctor/register",data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            if(res.data.success){
                alert("Doctor signup successful")
                navigate("/doctor/login");
            }
        }
        catch(err){
            console.log(err);
            alert("Error in doctor signup")
        }
    }
    return(
        <div className="main-container">
                <h1>Doctor Signup</h1>
                {profilePhoto && (
                    <img 
                    src ={URL.createObjectURL(profilePhoto)}
                    alt="profile preview"
                    className="image"/>
                )}

                <form className="form-container" onSubmit={handleSubmit}>
                    <input type="text" onChange={e=>setForm({...form, name: e.target.value})} placeholder="Enter Your Name"/>
                    <input type="number" onChange={e=>setForm({...form, phone: e.target.value})} placeholder="Enter Your Phone Number"/>
                    <input type="text" onChange={e=>setForm({...form, speciality: e.target.value})} placeholder="Enter your Speciality"/>
                    <input type="number" onChange={e=>setForm({...form, experience: e.target.value})} placeholder="Enter How Many Years of Experience"/>
                    <input type="text" onChange={e=>setForm({...form, email: e.target.value})} placeholder="Enter Your Email"/>
                    <input type="password" onChange={e=>setForm({...form, password: e.target.value})} placeholder="Enter Your Password"/>
                    <input type="file" accept="image/*" onChange={e=>{
                        setForm({...form, profilePhoto: e.target.files[0]});
                        setProfilePhoto(e.target.files[0]);
                    }} placeholder="Upload Profile Photo"></input>
                    <button>Signup</button> 
                </form>
                <div className="auth-bottom">
                    <h3> Already have account ? <Link to = "/doctor/login">Doctor Login</Link></h3>
                </div>
        </div>
    )
}
export default DoctorSignup;

//{e=>setForm({...form, profilePhoto: e.target.files[0]})}