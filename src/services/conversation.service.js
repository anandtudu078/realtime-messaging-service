import Conversation from "../models/Conversation.js";
import ConversationMember from "../models/ConversationMember.js";

const createConversation = async ({
  userId,
  type,
  title,
}) => {
  const conversation = await Conversation.create({
    type,
    title: type === "group" ? title : null,
    createdBy: userId,
  });

  await ConversationMember.create({
    conversationId: conversation._id,
    userId,
    role: "admin",
  });

  return conversation;
};

const getUserConversations = async (userId) => {
  const memberships = await ConversationMember.find({
    userId,
  }).select("conversationId");

  const conversationIds = memberships.map(
    (membership) => membership.conversationId
  );

  return Conversation.find({
    _id: { $in: conversationIds },
  }).sort({
    updatedAt: -1,
  });
};

const getConversationById = async (conversationId, userId) => {
  const membership = await ConversationMember.findOne({
    conversationId,
    userId,
  });

  if (!membership) {
    throw new Error("Conversation not found or access denied");
  }

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  return conversation;
};

export default {
  createConversation,
  getUserConversations,
  getConversationById,
};