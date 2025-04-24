import express from "express";
import { CommentController } from "../controller/comment.controller";

export const commentRouter = express.Router();

const commentController = new CommentController();
// Comment on a Tweet
commentRouter.post("/:tweetId", commentController.commentOnTweet);

// Reply to a Comment
commentRouter.post("/:commentId/reply", commentController.replyOnComment);

// Get Comments on a Tweet
commentRouter.get("/tweet/:tweetId", commentController.getTweetOnComment);
