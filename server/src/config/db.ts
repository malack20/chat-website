import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  if (!env.MONGO_URI) {
    console.log("MONGO_URI not set.");
    return;
  }

  // Set this BEFORE the connection attempt
  mongoose.set('bufferCommands', false);

  try {
    console.log("⏳ Attempting to reach MongoDB Atlas...");
    
    // AWAIT ensures the connection is finished before moving to the next line
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Increased to 10s for mobile hotspot stability
      socketTimeoutMS: 45000,        // Close sockets after 45s of inactivity
      family: 4                      // Force IPv4 (important for many Kenyan ISPs)
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error: any) {
    console.error("❌ MongoDB connection error:", error.message);
    
    // Check if it's a timeout error
    if (error.message.includes('timeout')) {
       console.error("💡 TIP: Your hotspot might be blocking port 27017. Try switching to Google DNS (8.8.8.8).");
    }
    
    throw error; // Throwing so index.ts can catch it and process.exit(1)
  }
};