import express from "express";
import { TweetController } from "../controller/tweet.controller";
import { authMiddleware } from "../middlewares";

export const tweetRouter = express.Router();

const tweetController = new TweetController();

// Create a tweet
tweetRouter.post("/", authMiddleware, tweetController.tweetPostController);

// Retweet a tweet
tweetRouter.post(
  "/:tweetId/retweet",
  authMiddleware,
  tweetController.retweetController
);

// Get tweets of a user (with total likes)
tweetRouter.get("/:userId", authMiddleware, tweetController.getTweetController);
