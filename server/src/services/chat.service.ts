import { Message } from "../models/Message";
import { Match } from "../models/Match";

const getMessagesForMatch = async (userId: string, matchId: string) => {
  const match = await Match.findById(matchId);
  if (!match || !match.users.includes(userId as any)) {
    throw new Error("Not authorized to view messages for this match");
  }
  return Message.find({ match: matchId }).sort({ createdAt: 1 });
};

export const chatService = {
  getMessagesForMatch
};






