import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    }
    catch(err){
        console.log("Error in connecting to MongoDB", err)
    }
}

export default connectDB;