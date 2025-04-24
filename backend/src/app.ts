import express, { Application } from "express";
import {
  authRouter,
  commentRouter,
  feedRouter,
  followRouter,
  likeRouter,
  mediaRouter,
  notificationRouter,
  searchRouter,
  tweetRouter,
  userRouter,
} from "./routes";
import dotenv from "dotenv";
import { seedAuth } from "./seed/auth.seed";
import { seedTweet } from "./seed/tweet.seed";

dotenv.config();

export const app: Application = express();

app.use(express.json());

// Authentication API
app.use("/api/v1/auth", authRouter); // Done

// Tweet API
app.use("/api/v1/tweet", tweetRouter); // Done

// Comment API
app.use("/api/v1/comment", commentRouter); // Done

// Like API
app.use("/api/v1/likes", likeRouter); // Done

// Search API
app.use("/api/v1/search", searchRouter); // Done

// Follow/unfollow API
app.use("/api/v1/follow", followRouter);

// User and Profile API
app.use("/api/v1/users", userRouter);

// Feed and TimeLine APi
app.use("/api/v1/feed", feedRouter);

// Notification API
app.use("/api/v1/notification", notificationRouter);

// Media API
app.use("/api/v1/media", mediaRouter);

// seedings
// seed data API endpoints
app.use("/api/seed/auth", seedAuth);

app.use("/api/seed/tweet", seedTweet);
