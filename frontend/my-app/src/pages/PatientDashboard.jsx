import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PatientDashboard.css";

function PatientDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const patientFromState = location.state?.patient;

  const [patient, setPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const [page, setPage] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [step, setStep] = useState(1);

  const [consultationData, setConsultationData] = useState({
    illnessHistory: "",
    surgeryHistory: "",
    surgeryTime: "",
    diabetic: "",
    allergies: "",
    others: ""
  });


  const logout = () => {
    navigate("/");
  };


  useEffect(() => {
    if (!patientFromState?._id) {
      alert("Please login again");
      navigate("/");
      return;
    }

    // fetch patient details
    axios
      .get(`http://localhost:5000/patient/details/${patientFromState._id}`)
      .then((res) => {
        setPatient(res.data.patient);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch doctors list
    axios
      .get("http://localhost:5000/doctor/all")
      .then((res) => {
        setDoctors(res.data.doctors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientFromState, navigate]);

  const submitConsultation = () => {
    axios.post("http://localhost:5000/consultation/add", {
      patientId: patient._id,
      doctorId: selectedDoctorId, 
      ...consultationData
    })
    .then(() => {
      alert("Consultation submitted");
      setShowModal(false);
      setStep(1);
    })
    .catch(err => console.log(err));
  };


  return (
    <div className="main">

      <div className="sidebar">
        <h2>Patient</h2>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("doctors")}>Doctors</button>
        <button onClick={logout}>Logout</button>
      </div>


      <div className="content">
        {page === "dashboard" && (
          <div className="box">
            <h2>Patient Information</h2>

            {!patient ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="patient-info">
                    <div className="patient-details">
                        <div className="info">
                            <p> {patient.name}</p>
                            <p> {patient.email}</p>
                        </div>
                        
                        <p><b>Age:</b> {patient.age}</p>
                        <p><b>Phone:</b> {patient.phone}</p>
                        <p><b>History of Illness:</b> {patient.historyOfIllness}</p>
                        <p><b>History of Surgery:</b> {patient.historyOfSurgery}</p>
                    </div>
                    <div className="patient-profile">
                      {patient.profilePhoto ? (
                        <img src={`http://localhost:5000/${patient.profilePhoto}`} alt="Profile" />
                      ) : (
                        <p>No profile photo</p>
                      )}
                    </div>
                </div>
              </>
            )}
          </div>
        )}

        {page === "doctors" && (
          <div>
            <h2>Available Doctors</h2>

            <div className="doctor-list">
              {doctors.map((doc) => (
                <div className="doctor-card" key={doc._id}>
                  <div className="doctor-profile">
                    {doc.profilePhoto ? (
                      <img
                        src={`http://localhost:5000/${doc.profilePhoto}`}
                        alt="Doctor Profile"
                        className="doctor-profile-pic"
                      />
                    ) : (<p>No profile photo</p>)
                    }
                  </div>
                  <div className="doctor-info">
                    <h3>Dr. {doc.name}</h3>
                    <p>Speciality: {doc.speciality}</p>
                    <p>Experience: {doc.experience} yr</p>
                  </div>
                  <button
                    onClick={() => {
                      setDoctorName(doc.name);
                      setSelectedDoctorId(doc._id);
                      setShowModal(true);
                    }}
                  >
                    Consult
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>


      {showModal && (
        <div
          className="modal-bg"
          onClick={() => {
            setShowModal(false);
            setStep(1);
          }}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <span
              className="close-btn"
              onClick={() => {
                setShowModal(false);
                setStep(1);
              }}> X </span>

            <h3>Consult {doctorName}</h3>


            {step === 1 && (
              <>
                <textarea placeholder="Current illness history" value={consultationData.illnessHistory}
                  onChange={(e) =>setConsultationData({ ...consultationData, illnessHistory: e.target.value})}/>

                <textarea placeholder="Recent surgery details" value={consultationData.surgeryHistory}
                  onChange={(e) =>setConsultationData({ ...consultationData, surgeryHistory: e.target.value })}/>

                <input type="text" placeholder="Surgery time span" value={consultationData.surgeryTime}
                  onChange={(e) => setConsultationData({...consultationData, surgeryTime: e.target.value})}/>

                <button onClick={() => setStep(2)}>Next</button>
              </>
            )}


            {step === 2 && (
              <>
                <p>Diabetic Information</p>

                <label>
                  <input type="radio" checked={consultationData.diabetic === "Yes"}
                    onChange={() => setConsultationData({ ...consultationData, diabetic: "Yes"})}/> Yes
                </label>

                <label>
                  <input type="radio" checked={consultationData.diabetic === "No"}
                    onChange={() =>setConsultationData({ ...consultationData,  diabetic: "No" })}/> No
                </label>

                <input type="text" placeholder="Any allergies" value={consultationData.allergies}
                  onChange={(e) => setConsultationData({  ...consultationData,  allergies: e.target.value  })  }
                />

                <input type="text" placeholder="Other medical issues" value={consultationData.others}
                  onChange={(e) => setConsultationData({  ...consultationData,  others: e.target.value })}/>

                <div className="modal-btns">
                  <button onClick={() => setStep(1)}>Back</button>
                  <button onClick={() => setStep(3)}>Next</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p>Scan the QR code to complete payment</p>

                <img
                  src="/qr.jpeg"
                  alt="Payment QR"
                  style={{ width: "180px", margin: "15px auto", display: "block" }}
                />

                <div className="modal-btns">
                  <button onClick={() => setStep(2)}>Back</button>
                  <button onClick={submitConsultation}>Submit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default PatientDashboard;
