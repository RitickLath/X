import express from "express";
import { LikeController } from "../controller/like.controller";

export const likeRouter = express.Router();

const likeController = new LikeController();
// Like or Unlike a Tweet
likeRouter.post("/tweet/:tweetId", likeController.likeTweet);

// Like or Unlike a Comment
likeRouter.post("/comment/:commentId", likeController.likeComment);
