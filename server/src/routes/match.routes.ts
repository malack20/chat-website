import { Router } from "express";
import {
  getRecommendations,
  likeUser,
  getMatches
} from "../controllers/match.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/recommendations", authMiddleware, getRecommendations);
router.post("/like/:userId", authMiddleware, likeUser);
router.get("/", authMiddleware, getMatches);

export default router;






