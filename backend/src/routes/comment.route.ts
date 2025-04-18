import express from "express";

export const commentRouter = express.Router();

// Comment on a tweet
commentRouter.post("/:tweetId", (req, res) => {});

// Reply to a comment
commentRouter.post("/:commentId/reply", (req, res) => {});

// Get comments on a tweet (with likes count too)
commentRouter.get("/tweet/:tweetId", (req, res) => {});

// Get replies to a comment (with like count too)
commentRouter.get("/:commentId/replies", (req, res) => {});
