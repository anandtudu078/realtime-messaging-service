import conversationService from "../services/conversation.service.js";

const createConversation = async (req, res) => {
  try {
    const { type, title } = req.body;


    //create the conversation
    const conversation =
      await conversationService.createConversation({
        userId: req.user.userId,
        type,
        title,
      });

    return res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      conversation,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get the conversation
const getMyConversations = async (req, res) => {
  try {
    const conversations =
      await conversationService.getUserConversations(
        req.user.userId
      );

    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });
  }
};

const getConversationById = async (req, res) => {
  try {
    const conversation = await conversationService.getConversationById(
      req.params.id,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createConversation,
  getMyConversations,
  getConversationById,
};