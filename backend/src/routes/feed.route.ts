import express from "express";
import { Tweet } from "../models";
import { authMiddleware } from "../middlewares";
import { FeedController } from "../controller/feed.controller";

export const feedRouter = express.Router();

// /api/v1/feed
const feedController = new FeedController();

// get persionalized feed (All the tweets latest first)
feedRouter.get("/", authMiddleware, feedController.getLatest);

// get trending tweets
feedRouter.get("/trending", authMiddleware, feedController.getTrending);

// get followers tweet
feedRouter.get("/following", authMiddleware, feedController.getFollowingTweet);

// Our API Design for Feed
// For Basic API of Feed:-
// 1. Showing the Feed based on Liked Tweets, hashtags Included
// 2. Latest one.

// For Get Tweets of who'm we follow again based on latest tweets.

// Get Latest. (The tweets of what hashtags get most likes)
