import express from "express";

export const tweetRouter = express.Router();

// Create a tweet
tweetRouter.post("/", (req, res) => {});

// Retweet a tweet
tweetRouter.post("/:tweetId/retweet", (req, res) => {});

// Get tweets of a user (also get total likes)
tweetRouter.get("/tweet/:userId", (req, res) => {});
