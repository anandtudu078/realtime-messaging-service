import express from "express";
import { getMessageHistoryController, createMessageController } from "../controllers/message.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/conversations/:conversationId/messages",
  authMiddleware,
  getMessageHistoryController
);

router.post(
  "/conversations/:conversationId/messages",
  authMiddleware,
  createMessageController
);

export default router;