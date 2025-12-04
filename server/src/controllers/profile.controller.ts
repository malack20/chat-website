import { Request, Response, NextFunction } from "express";
import { profileService } from "../services/profile.service";

export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const profile = await profileService.getByUserId(userId);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const profile = await profileService.updateByUserId(userId, req.body);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

export const getProfileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await profileService.getById(req.params.id);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};



