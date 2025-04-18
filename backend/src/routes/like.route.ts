import express from "express";

export const likeRouter = express.Router();

// Like or unlike a tweet
likeRouter.post("tweet/:tweetId", (req, res) => {});

// like or unlike a comment
likeRouter.post("comment/:commentId", (req, res) => {});
