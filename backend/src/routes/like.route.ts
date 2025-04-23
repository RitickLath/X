import express from "express";
import { User, Tweet, Like, Comment } from "../models";

export const likeRouter = express.Router();

// Like or Unlike a Tweet
likeRouter.post("/tweet/:tweetId", async (req, res) => {
  const userId = req.id;
  const { tweetId } = req.params;

  if (!userId || !tweetId) {
    res.status(400).json({
      success: false,
      message: "User ID and Tweet ID are required.",
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

  const existingLike = await Like.findOne({ likedBy: userId, tweetId });
  let likeAction;
  let message;

  if (existingLike) {
    likeAction = await Like.findOneAndDelete({ likedBy: userId, tweetId });
    message = "Tweet unliked successfully.";
  } else {
    likeAction = await Like.create({ likedBy: userId, tweetId });
    message = "Tweet liked successfully.";
  }

  res.status(200).json({
    success: true,
    message,
    data: likeAction,
  });
});

// Like or Unlike a Comment
likeRouter.post("/comment/:commentId", async (req, res) => {
  const userId = req.id;
  const { commentId } = req.params;

  if (!userId || !commentId) {
    res.status(400).json({
      success: false,
      message: "User ID and Comment ID are required.",
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

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404).json({
      success: false,
      message: "Comment not found.",
    });
    return;
  }

  const existingLike = await Like.findOne({ likedBy: userId, commentId });
  let likeAction;
  let message;

  if (existingLike) {
    likeAction = await Like.findOneAndDelete({ likedBy: userId, commentId });
    message = "Comment unliked successfully.";
  } else {
    likeAction = await Like.create({ likedBy: userId, commentId });
    message = "Comment liked successfully.";
  }

  res.status(200).json({
    success: true,
    message,
    data: likeAction,
  });
});
