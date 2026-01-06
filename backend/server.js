import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import path from "path";


const app = express();
app.use(cors())
app.use(express.json());


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();

app.use("/doctor",doctorRoutes);
app.use("/patient",patientRoutes);
app.use("/consultation",consultationRoutes);

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})
