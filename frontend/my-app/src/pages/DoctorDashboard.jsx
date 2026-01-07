import axios from "axios";
import { useEffect , useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/DoctorDashboard.css";
import Consultation from "./Consultation";


function DoctorDashboard(){
    const location = useLocation();
    const navigate = useNavigate();

    const doctorFromState = location.state?.doctor;

    const [doctor , setDoctor] = useState(null)
    const [patients , setPatients] = useState([])

    const [consultations, setConsultations] = useState([]);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    const [page , setPage] = useState("dashboard");

    const logout = ()=>{
        navigate("/doctor/login");
    }

    useEffect(()=>{
        if(!doctorFromState?._id){
            alert("please login again");
            navigate("/doctor/login")
            return;
        }

        // fetch doctor details
        axios
         .get(`http://localhost:5000/doctor/details/${doctorFromState._id}`)
         .then((res)=>{
            setDoctor(res.data.doctor)
         })
         .catch((err)=>{
            console.log(err)
         });

        // fetch consultations list
        axios
        .get(`http://localhost:5000/consultation/all/${doctorFromState._id}`)
        .then((res) => {
          setConsultations(res.data.consultations);
        })
        .catch((err) => {
          console.log(err);
        });

    }, [doctorFromState , navigate]);

    return(
        <div className="doctor-main">

            <div className="doctor-sidebar">
                <h2>Dr. {doctor?.name}</h2>
                <button onClick={()=>setPage("dashboard")}>Dashboard</button>
                <button onClick={()=>setPage("patients")}>Patients</button>
                <button onClick={logout}>Logout</button>
            </div>

            <div className="doctor-content">
                {page === "dashboard" && (
          <div className="box">
            <h2>Doctor Information</h2>

                {!doctor ? (
                <p>Loading...</p>
                    ) : (
                    <>
                        <div className="doctor-info">
                            <div className="doctor-details">
                                <div className="info">
                                    <p> {doctor?.name}</p>
                                    <p> {doctor?.email}</p>
                                </div>
                                
                                <p><b>Phone:</b> {doctor?.phone}</p>
                                <p><b>Speciality:</b> {doctor?.speciality}</p>
                                <p><b>Experience:</b> {doctor?.experience}</p>
                            </div>
                            <div className="doctor-profile">
                            {doctor?.profilePhoto ? (
                                <img src={`http://localhost:5000/${doctor.profilePhoto}`} alt="Profile" />
                            ) : (
                                <p>No profile photo</p>
                            )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            )}

            {page === "patients" && (
              <div>
                <h2>Patient Consultations</h2>

                {consultations.length === 0 ? (
                  <p>No consultations yet</p>
                ) : (
                  <div className="consultation-list">
                    {consultations.map((c) => (
                      <div className="consultation-card" key={c._id}>
                        
                        <h2>{c.patientId?.name}</h2>

                        <p><b>Illness History:</b> {c.illnessHistory}</p>
                        <p><b>Surgery History:</b> {c.surgeryHistory || "No"}</p>
                        <p><b>Surgery Time:</b> {c.surgeryTime || "N/A"}</p>
                        <p><b>Diabetic:</b> {c.diabetic}</p>
                        <p><b>Allergies:</b> {c.allergies || "No"}</p>
                        <p><b>Other Issues:</b> {c.others || "No"}</p>

                        <button
                          onClick={() => {
                            setSelectedConsultation(c);
                            setShowPrescriptionModal(true);
                          }}
                        >
                          Give Prescription
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
          {showPrescriptionModal && selectedConsultation && (
            <Consultation
              consultation={selectedConsultation}
              setShowPrescriptionModal={setShowPrescriptionModal}
            />
          )}
        </div>
    )
}
export default DoctorDashboard;