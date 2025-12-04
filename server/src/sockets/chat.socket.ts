import { Server, Socket } from "socket.io";
import { Message } from "../models/Message";

export const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on("chat:send", async (payload: { matchId: string; senderId: string; content: string }) => {
    const message = await Message.create({
      match: payload.matchId,
      sender: payload.senderId,
      content: payload.content
    });

    io.to(payload.matchId).emit("chat:newMessage", message);
  });

  socket.on("chat:join", (matchId: string) => {
    socket.join(matchId);
  });
};



