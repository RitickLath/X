import express from "express";

export const feedRouter = express.Router();

// get persionalized feed
feedRouter.get("/", (req, res) => {});

// get trending tweets
feedRouter.get("/trending", (req, res) => {});

// get pagination tweets (next tweet)(?page=pagenumber)
feedRouter.get("/next", (req, res) => {});
