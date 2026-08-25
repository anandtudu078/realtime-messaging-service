import User from "../models/User.js";

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-passwordHash"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        lastSeenAt: user.lastSeenAt,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export default {
  getMe,
};