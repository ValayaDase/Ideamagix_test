import express from "express";
import upload from "../middleware/upload.js";
import { registerDoctor , doctorLogin , getAllDoctors , getDoctorDetails } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/register", upload.single("profile"), registerDoctor);
router.post("/login", doctorLogin);
router.get("/all",getAllDoctors);
router.get("/details/:doctorId", getDoctorDetails);

export default router;
