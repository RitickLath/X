import express from "express";
import { SearchController } from "../controller/search.controller";

const router = express.Router();
const controller = new SearchController();

// search for username /?q=ritick
router.get("/users", controller.searchUsers);

// search for hashtag /?q=peace
router.get("/hashtags", controller.searchHashtags);

// get suggestions on hashrtag
router.get("/suggestions", controller.suggestHashtags);

export const searchRouter = router;
