import express from "express";
import { authMiddleware } from "../middlewares";
import { Comment, User } from "../models";
import mongoose from "mongoose";

export const profileRouter = express.Router();

profileRouter.get("/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Invalid user ID" });
    return;
  }

  try {
    const user = await User.findById(userId)
      .populate("tweets")
      .lean()
      .select("-password");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const followers = await User.find({ following: userId })
      .select("username email bio") // Return only necessary fields
      .lean();

    const comments = await Comment.find({ author: userId }).populate("tweetId");

    res.status(200).json({
      success: true,
      data: {
        user,
        followers,
        comments,
      },
    });
    return;
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ success: false, message: "Server error" });
    return;
  }
});
