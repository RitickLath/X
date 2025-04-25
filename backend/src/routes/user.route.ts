import express from "express";
import { User } from "../models";

export const userRouter = express.Router();

// Get user profile by ID
userRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId }).populate("following");
  res.status(200).json({ data: user });
});

// Follow or unfollow a user
userRouter.post("/:targetId/follow", (req, res) => {});

// Get followers of a user
userRouter.get("/:userId/followers", (req, res) => {});

// Get following users of a user
userRouter.get("/:userId/following", (req, res) => {});

// Search users by username or name
userRouter.get("/search", (req, res) => {});

// Get follow/follower counts
userRouter.get("/:userId/follow-stats", (req, res) => {});
