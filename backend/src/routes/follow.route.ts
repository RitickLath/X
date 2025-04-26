import express from "express";
import { FollowController } from "../controller/follow.controller";
import { authMiddleware } from "../middlewares";
import { User } from "../models";

export const followRouter = express.Router();

const followController = new FollowController();

// POST: Toggle follow/unfollow a user
followRouter.post("/", authMiddleware, followController.toggleFollow);

// GET: Get followers of a user
followRouter.get("/", authMiddleware, followController.getFollowers);

// GET: Get following of a user
followRouter.get("/following", followController.getFollowings);
