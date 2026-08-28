import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import conversationController from "../controllers/conversation.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  conversationController.createConversation
);

router.get(
  "/",
  authMiddleware,
  conversationController.getMyConversations
);

router.get(
  "/:id",
  authMiddleware,
  conversationController.getConversationById
);

export default router;