import express from "express";
import { CommentController } from "../controller/comment.controller";

export const commentRouter = express.Router();

//const commentController = new CommentController();

// Comment on a tweet
//commentRouter.post("/:tweetId", commentController.commentOnTweet);

// Reply to a comment
commentRouter.post("/:commentId/reply", (req, res) => {});

// Get comments on a tweet (with likes count too)
commentRouter.get("/tweet/:tweetId", (req, res) => {});

// Get replies to a comment (with like count too)
commentRouter.get("/:commentId/replies", (req, res) => {});
