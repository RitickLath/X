import express from "express";
import { TweetController } from "../controller/tweet.controller";

export const tweetRouter = express.Router();

const tweetController = new TweetController();

// Create a tweet
tweetRouter.post("/", tweetController.tweetPostController);

// Retweet a tweet
tweetRouter.post("/:tweetId/retweet", (req, res) => {}); // make a field original/retweet part in model (enum)

// Get tweets of a user (also get total likes)
tweetRouter.get("/tweet/:userId", (req, res) => {});
