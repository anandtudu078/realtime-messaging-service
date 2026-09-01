import { getMessageHistory, createMessage } from "../services/message.service.js";

export const getMessageHistoryController = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit, cursor } = req.query;
    const userId = req.user.userId;

    const result = await getMessageHistory({
      conversationId,
      userId,
      limit,
      cursor,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch message history",
    });
  }
};

export const createMessageController = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const message = await createMessage({
      conversationId,
      userId,
      content,
    });

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create message",
    });
  }
};