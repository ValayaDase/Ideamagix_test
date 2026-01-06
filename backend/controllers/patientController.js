import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import bcrypt from "bcryptjs";

export const registerPatient = async(req,res)=>{
    try{
        const {name,phone,historyIllness,historySurgery,age,email,password} = req.body;

        const existPatient = await Patient.findOne({email});
        if(existPatient){
            return res.json({success:false , message:"Patient already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        await Patient.create({
            name,
            email,
            phone,
            historyOfIllness: historyIllness,
            historyOfSurgery: historySurgery,
            age,
            password: hashedPassword,
            profilePhoto: req.file ? req.file.path : null
        })
        res.json({success:true , message:"Doctor registered successfully"})
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:"Error in registering doctor"})
    }
}

export const patientLogin = async(req,res)=>{
    try{
        const{email , password} = req.body;

        const existPatient = await Patient.findOne({email});
        if(!existPatient){
            return res.json({success:false , message:"Patient does not exist"})
        }
        const isMatch = await bcrypt.compare(password , existPatient.password);
        if(!isMatch){
            return res.json({success:false , message:"Incorrect password"})
        }
        res.json({success:true , message:"Patient logged in successfully" , patient: existPatient} )
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:"Error in patient login"})
    }
}


export const getPatientDetails = async(req,res)=>{
    try{
        const {patientId} = req.params;
        const patient = await Patient.findById(patientId)
        if(!patient){
            return res.json({success:false , message:"patient not found"})
        }
        res.json({success:true ,  message:"Patient details fetched successfully" , patient} )
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:"Error in fetching patient details"})
    }
}


export const getAllPatients = async(req,res)=>{
    try{
        const patients = await Patient.find({});
        if(!patients){
            return res.json({success:false , message:"No patients found"})
        }
        res.json({success:true , message:"Patients fetched successfully" , patients})
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:"Error in fetching patients"})
    }
}
