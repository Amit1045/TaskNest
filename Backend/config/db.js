import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });


export const connectDB=async ()=>{
    try {
        const conn = await mongoose.connect(process.env.mongo_url);
        console.log(`mongoDB Connected Successfully`);
        
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1) // process code 1 means error
    }
} 