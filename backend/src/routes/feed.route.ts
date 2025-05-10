import express from "express";
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

// 1. /feed/latest?page=0 - Fetches the most recent tweets across the platform, sorted by creation date (descending).
//    Supports pagination via the 'page' query parameter. Shows the latest 10 tweets per page.
//
// 2. /feed/trending?page=0 - Fetches trending tweets based on weighted engagement, considering likes, retweets, and comments.
//    The engagement weight is: likes (1x), comments (1.5x), and retweets (2x).
//    Sorted by engagement score with a fallback to 'createdAt' for tie-breaking. Supports pagination.
//
// 3. /feed/following?page=0 - Fetches tweets from users the current logged-in user is following, sorted by creation date (descending).
//    Only shows tweets from users the authenticated user follows. Supports pagination via the 'page' query parameter.
//
