import http from "http";
import { Server as SocketIOServer } from "socket.io";
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
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});

