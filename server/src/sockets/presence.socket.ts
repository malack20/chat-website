import { Server, Socket } from "socket.io";

const onlineUsers = new Set<string>();

export const registerPresenceHandlers = (io: Server, socket: Socket) => {
  socket.on("presence:online", (userId: string) => {
    onlineUsers.add(userId);
    io.emit("presence:update", Array.from(onlineUsers));
  });

  socket.on("disconnect", () => {
    // In a real app, you would map socket.id -> userId
    // For now this is a placeholder.
  });
};



