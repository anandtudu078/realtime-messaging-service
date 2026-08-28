import express from "express";
import { getMessageHistoryController } from "../controllers/message.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/conversations/:conversationId/messages",
  authMiddleware,
  getMessageHistoryController
);

export default router;