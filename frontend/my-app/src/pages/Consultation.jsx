import axios from "axios";
import { useState } from "react";
import "../styles/Consultation.css";
import API_URL from "../config/api";

function Consultation({ consultation, setShowPrescriptionModal, refreshConsultations }) {

  const [prescription, setPrescription] = useState(
    consultation?.prescription || ""
  );

  const submitPrescription = () => {
    axios
      .put(
        `${API_URL}/consultation/prescription/${consultation._id}`,
        { prescription }
      )
      .then(() => {
        alert("Prescription saved");
        setPrescription("");
        setShowPrescriptionModal(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error saving prescription");
      });
  };

  return (
    <div
      className="consult-modal-bg"
      onClick={() => setShowPrescriptionModal(false)}
    >
      <div
        className="consult-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <span
          className="consult-close-btn"
          onClick={() => setShowPrescriptionModal(false)}
        >
          X
        </span>

        <h3>Give Prescription</h3>

        <p>
          <b>Patient Name:</b> {consultation?.patientId?.name}
        </p>

        <input
            type="text"
            className="consult-input"
            placeholder="Give prescription"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            />


        <div className="consult-btns">
          <button onClick={() => setShowPrescriptionModal(false)}>
            Cancel
          </button>
          <button onClick={submitPrescription}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Consultation;
