import express from "express";

export const userRouter = express.Router();

// Get user profile by ID
userRouter.get("/:userId", (req, res) => {});

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
