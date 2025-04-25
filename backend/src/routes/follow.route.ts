import express from "express";
import { FollowController } from "../controller/follow.controller";
import { authMiddleware } from "../middlewares";

export const followRouter = express.Router();

const followController = new FollowController();

// POST: Toggle follow/unfollow a user
followRouter.post("/", authMiddleware, followController.toggleFollow);

// GET: Get followers of a user
followRouter.get("/", authMiddleware, followController.getFollowers);
