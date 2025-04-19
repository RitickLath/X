import express from "express";
import { TweetController } from "../controller/tweet.controller";

export const tweetRouter = express.Router();

const tweetController = new TweetController();

// Create a tweet
tweetRouter.post("/", tweetController.tweetPostController);

// Retweet a tweet
tweetRouter.post("/:tweetId/retweet", (req, res) => {});

// Get tweets of a user (also get total likes)
tweetRouter.get("/tweet/:userId", (req, res) => {});
