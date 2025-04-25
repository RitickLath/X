import express from "express";
import { CommentController } from "../controller/comment.controller";
import { authMiddleware } from "../middlewares";

export const commentRouter = express.Router();

const commentController = new CommentController();
// Comment on a Tweet
commentRouter.post(
  "/:tweetId",
  authMiddleware,
  commentController.commentOnTweet
);

// Reply to a Comment
commentRouter.post(
  "/:commentId/reply",
  authMiddleware,
  commentController.replyOnComment
);

// Get Comments on a Tweet
commentRouter.get(
  "/tweet/:tweetId",
  authMiddleware,
  commentController.getTweetOnComment
);
