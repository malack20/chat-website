import { Request, Response, NextFunction } from "express";
import { matchService } from "../services/match.service";

export const getRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const recommendations = await matchService.getRecommendations(userId);
    res.status(200).json(recommendations);
  } catch (error) {
    next(error);
  }
};

export const likeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const likedUserId = req.params.userId;
    const result = await matchService.likeUser(userId, likedUserId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const matches = await matchService.getMatches(userId);
    res.status(200).json(matches);
  } catch (error) {
    next(error);
  }
};


