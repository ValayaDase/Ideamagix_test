import doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import Consultation from "../models/Consultation.js";

export const addConsultation = async (req, res) => {
  try {
    const {patientId, doctorId, illnessHistory, surgeryHistory, surgeryTime, diabetic, allergies, others} = req.body;

    const newConsultation = new Consultation({
      patientId,
      doctorId,
      illnessHistory,
      surgeryHistory,
      surgeryTime,
      diabetic,
      allergies,
      others
    });

    await newConsultation.save();

    res.status(201).json({
      message: "Consultation saved successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving consultation",
      error: error.message
    });
  }
};

export const getConsultations = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const consultations = await Consultation.find({ doctorId })
      .populate("patientId", "name");

    res.status(200).json({
      consultations
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching consultations",
      error
    });
  }
};

export const addPrescription = async (req, res) => {
  try {
    const { prescription } = req.body;

    await Consultation.findByIdAndUpdate(
      req.params.consultationId,
      { prescription }
    );

    res.json({ message: "Prescription saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving prescription" });
  }
};

export const getPatientPrescriptions = async (req, res) => {
  try {
    const { patientId } = req.params;

    const consultations = await Consultation.find({
      patientId,
      prescription: { $exists: true, $ne: "" }
    }).populate("doctorId", "name");

    res.json({ consultations });
  } catch (err) {
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
};
