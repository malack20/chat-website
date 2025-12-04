import { Router } from "express";
import {
  getMyProfile,
  updateMyProfile,
  getProfileById
} from "../controllers/profile.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.get("/:id", authMiddleware, getProfileById);

export default router;



