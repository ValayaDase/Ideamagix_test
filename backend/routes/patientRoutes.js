import express from 'express';
import upload from '../middleware/upload.js';
import { registerPatient , patientLogin , getPatientDetails , getAllPatients  } from '../controllers/patientController.js';

const router = express.Router();

router.post('/register', upload.single('profile'), registerPatient);
router.post('/login', patientLogin);
router.get('/details/:patientId', getPatientDetails);
router.get("/all",getAllPatients);

export default router;