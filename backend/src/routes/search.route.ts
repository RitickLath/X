import express from "express";

export const searchRouter = express.Router();

// search by username (?q=ritick)
searchRouter.get("/users", (req, res) => {});

// search by hashtags (?q=dev)
searchRouter.get("/hashtags", (req, res) => {});

// get hashtag suggestions (?q=nodejs)
searchRouter.get("/suggestions", (req, res) => {});
