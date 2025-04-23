import express from "express";
import { Comment, Tweet, User } from "../models";

export const commentRouter = express.Router();

// Comment on a tweet
commentRouter.post("/:tweetId", async (req, res) => {
  const author = req.id;
  const { tweetId } = req.params;
  const { comment } = req.body;

  if (!author || !tweetId || !comment) {
    res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
    return;
  }

  if (comment.length < 1) {
    res.status(400).json({
      success: false,
      message: "Comment should not be empty.",
    });
    return;
  }

  const user = await User.find({ _id: author });
  if (!user) {
    res.status(400).json({ success: false, message: "Author not found." });
    return;
  }

  const tweet = await Tweet.find({ _id: tweetId });
  if (!tweet) {
    res.status(400).json({ success: false, message: "Tweet not found." });
    return;
  }

  const response = await Comment.create({ author, comment, tweetId });
  res.status(200).json({
    success: true,
    message: "Comment added successfully",
    data: response,
  });
});

// Reply to a comment
commentRouter.post("/:commentId/reply", async (req, res) => {
  const { author } = req.body;
  const { comment } = req.body;
  const { commentId } = req.params;

  if (!author || !commentId || !comment) {
    res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
    return;
  }

  if (comment.length < 1) {
    res.status(400).json({
      success: false,
      message: "Reply should not be empty.",
    });
    return;
  }

  const user = await User.find({ _id: author });
  if (!user) {
    res.status(400).json({ success: false, message: "Author not found." });
    return;
  }

  const parentComment = await Comment.find({ _id: commentId });
  if (!parentComment) {
    res.status(400).json({ success: false, message: "Comment not found." });
    return;
  }

  const response = await Comment.create({ author, comment, commentId });
  res.status(200).json({
    success: true,
    message: "Reply added successfully",
    data: response,
  });
});

// Get comments on a tweet
commentRouter.get("/tweet/:tweetId", async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId) {
    res.status(400).json({
      success: false,
      message: "Tweet ID is required.",
    });
    return;
  }

  const tweet = await Tweet.find({ _id: tweetId });
  if (!tweet) {
    res.status(404).json({
      success: false,
      message: "Tweet not found.",
    });
    return;
  }

  // Fetch top-level comments (not replies)
  const comments = await Comment.find({
    tweetId,
    commentId: { $exists: false },
  })
    .populate("author") // not populating author need to be fixed
    .populate("tweetId")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Comments fetched successfully",
    data: comments,
  });
});
