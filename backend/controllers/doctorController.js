import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import bcrypt from "bcryptjs";

export const registerDoctor = async(req,res)=>{
    try{
        const {name,email,phone,speciality,experience,password} = req.body;

        const existDoctor = await Doctor.findOne({email});
        if(existDoctor){
            return res.json({success:false , message:"Doctor already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        await Doctor.create({
            name,
            email,
            phone,
            speciality,
            experience,
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

export const doctorLogin = async(req,res)=>{
    try{
        const{email , password} = req.body;

        const existDoctor = await Doctor.findOne({email});
        if(!existDoctor){
            return res.json({success:false , message:"Doctor does not exist"})
        }
        const isMatch = await bcrypt.compare(password , existDoctor.password);
        if(!isMatch){
            return res.json({success:false , message:"Incorrect password"})
        }
        res.json({success:true , message:"Doctor logged in successfully" , doctor: existDoctor} )
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:"Error in doctor login"})
    }
}


export const getAllDoctors = async(req,res)=>{
    try{
        const doctors = await Doctor.find({});
        if(!doctors){
            return res.json({success:false , message:"No doctors found"})
        }
        res.json({success:true , message:"Doctors fetched successfully" , doctors})
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:"Error in fetching doctors"})
    }
}


export const getDoctorDetails = async(req,res)=>{
    try{
        const{doctorId} = req.params;
        const doctor = await Doctor.findById(doctorId)
        if(!doctor){
            return res.json({success:false , message:"Doctor not found"})
        }
        res.json({success:true , message:"Doctor fetched successfully" , doctor})
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:"Error in fetching doctor"})
    }
}

