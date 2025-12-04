import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  if (!env.MONGO_URI) {
    console.log("MONGO_URI not set. Skipping MongoDB connection (running without DB).");
    return;
  }

  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
    // Do not exit the process so you can run the server without DB for now.
  }
};

