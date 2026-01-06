import express from "express"
import {addConsultation ,  getConsultations } from "../controllers/consultationController.js";
const router = express.Router();

router.post("/add", addConsultation);
router.get("/all/:doctorId", getConsultations);

export default router;