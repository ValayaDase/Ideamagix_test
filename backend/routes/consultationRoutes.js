import express from "express"
import {addConsultation ,  getConsultations , addPrescription , getPatientPrescriptions } from "../controllers/consultationController.js";
const router = express.Router();

router.post("/add", addConsultation);
router.get("/all/:doctorId", getConsultations);
router.put("/prescription/:consultationId", addPrescription);
router.get("/patient/:patientId", getPatientPrescriptions);

export default router;