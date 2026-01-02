import { Router } from "express";
import { getMessagesForMatch } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:matchId/messages", authMiddleware, getMessagesForMatch);

export default router;






