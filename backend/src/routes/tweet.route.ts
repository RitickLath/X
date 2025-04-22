import express from "express";
import { TweetController } from "../controller/tweet.controller";

export const tweetRouter = express.Router();

const tweetController = new TweetController();

// Create a tweet
tweetRouter.post("/", tweetController.tweetPostController);

// Retweet a tweet
tweetRouter.post("/:tweetId/retweet", tweetController.retweetController);

// Get tweets of a user (with total likes)
tweetRouter.get("/:userId", tweetController.getTweetController);
