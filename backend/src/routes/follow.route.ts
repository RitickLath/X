import express from "express";
import { User } from "../models";
import { FollowController } from "../controller/follow.controller";

export const followRouter = express.Router();

const followController = new FollowController();

// POST: Toggle follow/unfollow a user
followRouter.post("/:userId", followController.toggleFollow);

// GET: Get followers of a user
followRouter.get("/:userId", followController.getFollowers);
