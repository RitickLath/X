import express from "express";
import { User } from "../models";
import { UserController } from "../controller/user.controller";

export const userRouter = express.Router();

const userController = new UserController();

// Get user profile by ID
userRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId })
    .populate("following")
    .populate("tweets");
  res.status(200).json({ data: user });
});

// Get following users of a user
userRouter.get("/:userId/following", userController.getFollowing);

// Get follow/follower counts
userRouter.get("/:userId/follow-stats", userController.getFollowFollowingCount);
