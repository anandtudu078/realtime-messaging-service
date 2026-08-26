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

export default {
  createConversation,
  getUserConversations,
};