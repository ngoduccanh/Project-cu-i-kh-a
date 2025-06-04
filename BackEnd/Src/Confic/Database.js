import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const DB_connect = process.env.MONGO_URI
const connectDataBase= async() =>{
    try{
        await mongoose.connect(DB_connect);
        console.log('✅ Database connected successfully');
    }     catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
    }
}
export default connectDataBase