import express from "express";
import { Tweet } from "../models";

export const feedRouter = express.Router();

// get persionalized feed
feedRouter.get("/", (req, res) => {});

// get trending tweets
feedRouter.get("/trending", (req, res) => {});

// get pagination tweets (next tweet)(?page=pagenumber)
feedRouter.get("/next", (req, res) => {});

// get tweets
feedRouter.get("/tweets", async (req, res) => {
  const tweets = await Tweet.find({ original: true })
    .sort({ createdAt: -1 })
    .populate("author", "username");
  res.json({ data: tweets });
});
