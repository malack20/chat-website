import { Request, Response, NextFunction } from "express";
import { chatService } from "../services/chat.service";

export const getMessagesForMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const matchId = req.params.matchId;
    const messages = await chatService.getMessagesForMatch(userId, matchId);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};



