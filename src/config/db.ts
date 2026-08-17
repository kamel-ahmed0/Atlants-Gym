import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from 'dns'; // kamel neeed it to run the code due to dsn errors

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI as string;
    dns.setServers(['8.8.8.8', '1.1.1.1']);// kamel neeed it to run the code due to dsn errors
    await mongoose.connect(uri);
    console.log("MongoDB connected ");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};