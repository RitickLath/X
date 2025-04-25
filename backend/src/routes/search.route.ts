import express from "express";
import { SearchController } from "../controller/search.controller";
import { authMiddleware } from "../middlewares";

const router = express.Router();
const controller = new SearchController();

// search for username /?q=ritick
router.get("/users", authMiddleware, controller.searchUsers);

// search for hashtag /?q=peace
router.get("/hashtags", authMiddleware, controller.searchHashtags);

// get suggestions on hashrtag
router.get("/suggestions", authMiddleware, controller.suggestHashtags);

export const searchRouter = router;
