import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
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
    age: {
        type: Number,
        required: true
    },
    historyOfIllness: {
        type: String
    },
    historyOfSurgery: {
        type: String
    },
    profilePhoto:{
        type: String
    },
    password: {
        type : String,
        required : true
    }
});

const Patient = mongoose.model("Patient", patientSchema)
export default Patient;