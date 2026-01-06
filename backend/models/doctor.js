import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    phone: {
        type : Number
    },
    speciality:{
        type: String
    },
    experience:{
        type: Number
    },
    profilePhoto:{
        type: String
    },
    password: {
        type : String,
        required : true
    }
});

const doctor = mongoose.model("Doctor", doctorSchema)
export default doctor