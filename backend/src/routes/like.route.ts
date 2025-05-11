import express from "express";
import { LikeController } from "../controller/like.controller";
import { authMiddleware } from "../middlewares";

export const likeRouter = express.Router();

const likeController = new LikeController();
// Like or Unlike a Tweet
likeRouter.post("/tweet/:tweetId", authMiddleware, likeController.likeTweet);

// Like or Unlike a Comment
likeRouter.post(
  "/comment/:commentId",
  authMiddleware,
  likeController.likeComment
);

// Get Users who liked a tweet
likeRouter.get("/liked-users", authMiddleware, likeController.getLikedUsers);
