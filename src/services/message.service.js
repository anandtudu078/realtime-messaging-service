import Message from "../models/Message.js";
import ConversationMember from "../models/ConversationMember.js";

export const getMessageHistory = async ({
  conversationId,
  userId,
  limit = 20,
  cursor,
}) => {
  // 1. Check whether the user belongs to the conversation
  const membership = await ConversationMember.findOne({
    conversationId,
    userId,
  });

  if (!membership) {
    const error = new Error("You are not a member of this conversation");
    error.statusCode = 403;
    throw error;
  }

  // 2. Keep the limit under control
  const parsedLimit = Math.min(Math.max(Number(limit) || 20, 1), 50);

  // 3. Base query
  const query = {
    conversationId,
  };

  // 4. Apply cursor if provided
  if (cursor) {
    const cursorMessage = await Message.findById(cursor).select(
      "createdAt conversationId"
    );

    if (!cursorMessage || cursorMessage.conversationId.toString() !== conversationId) {
      const error = new Error("Invalid cursor");
      error.statusCode = 400;
      throw error;
    }

    query.$or = [
      {
        createdAt: {
          $lt: cursorMessage.createdAt,
        },
      },
      {
        createdAt: cursorMessage.createdAt,
        _id: {
          $lt: cursor,
        },
      },
    ];
  }

  // 5. Fetch one extra message to determine hasMore
  const messages = await Message.find(query)
    .sort({
      createdAt: -1,
      _id: -1,
    })
    .limit(parsedLimit + 1)
    .populate("senderId", "name email");

  // 6. Determine whether another page exists
  const hasMore = messages.length > parsedLimit;

  if (hasMore) {
    messages.pop();
  }

  // 7. Cursor points to the oldest message in this response
  const nextCursor =
    hasMore && messages.length > 0
      ? messages[messages.length - 1]._id
      : null;

  return {
    messages,
    pagination: {
      limit: parsedLimit,
      hasMore,
      nextCursor,
    },
  };
};