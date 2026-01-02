import http from "http";
import { Server as SocketIOServer } from "socket.io";
import mongoose from "mongoose"; // Added mongoose import for connection checking
import app from "./app";
import { connectDB } from "./config/db";
import { registerChatHandlers } from "./sockets/chat.socket";
import { registerPresenceHandlers } from "./sockets/presence.socket";
import { env } from "./config/env";

const PORT = Number(env.PORT) || 5000;
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  registerChatHandlers(io, socket);
  registerPresenceHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

const start = async () => {
  try {
    console.log("⏳ Connecting to MongoDB (cluster1)...");
    
    // 1. Wait for the database connection
    await connectDB();

    // 2. STRICT CHECK: Ensure we are actually connected before starting the server
    // 1 = connected, 2 = connecting
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database is not in 'Connected' state.");
    }

    // 3. Start the server only after DB success
    server.listen(PORT, () => {
      console.log(`✅ SUCCESS: Database connected and server running on http://localhost:${PORT}`);
    });
    
  } catch (err: any) {
    console.error("❌ CRITICAL ERROR: Could not start server.");
    console.error("Reason:", err.message);
    
    // If the DB fails, we exit the process so you can see the error clearly
    process.exit(1);
  }
};

start();