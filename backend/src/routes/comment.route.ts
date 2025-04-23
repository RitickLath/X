import express from "express";
import { Comment, Tweet, User } from "../models";

export const commentRouter = express.Router();

// Comment on a Tweet
commentRouter.post("/:tweetId", async (req, res) => {
  const userId = req.id;
  const { tweetId } = req.params;
  const { comment } = req.body;

  if (!userId || !tweetId || !comment) {
    res.status(400).json({
      success: false,
      message: "User ID, Tweet ID, and comment are required.",
    });
    return;
  }

  if (comment.trim().length < 1) {
    res.status(400).json({
      success: false,
      message: "Comment cannot be empty.",
    });
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found.",
    });
    return;
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    res.status(404).json({
      success: false,
      message: "Tweet not found.",
    });
    return;
  }

  const newComment = await Comment.create({
    author: userId,
    comment,
    tweetId,
  });

  res.status(201).json({
    success: true,
    message: "Comment posted successfully.",
    data: newComment,
  });
});

// Reply to a Comment
commentRouter.post("/:commentId/reply", async (req, res) => {
  const userId = req.id;
  const { commentId } = req.params;
  const { comment } = req.body;

  if (!userId || !commentId || !comment) {
    res.status(400).json({
      success: false,
      message: "User ID, Comment ID, and reply content are required.",
    });
    return;
  }

  if (comment.trim().length < 1) {
    res.status(400).json({
      success: false,
      message: "Reply cannot be empty.",
    });
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found.",
    });
    return;
  }

  const parentComment = await Comment.findById(commentId);
  if (!parentComment) {
    res.status(404).json({
      success: false,
      message: "Parent comment not found.",
    });
    return;
  }

  const reply = await Comment.create({
    author: userId,
    comment,
    commentId,
  });

  res.status(201).json({
    success: true,
    message: "Reply added successfully.",
    data: reply,
  });
});

// Get Comments on a Tweet
commentRouter.get("/tweet/:tweetId", async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId) {
    res.status(400).json({
      success: false,
      message: "Tweet ID is required.",
    });
    return;
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    res.status(404).json({
      success: false,
      message: "Tweet not found.",
    });
    return;
  }

  const comments = await Comment.find({
    tweetId,
    commentId: { $exists: false },
  })
    .populate("author", "username")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Comments retrieved successfully.",
    data: comments,
  });
});
