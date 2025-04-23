import express, { Application } from "express";
import {
  authRouter,
  commentRouter,
  feedRouter,
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
app.use("/api/v1/auth", authRouter);

// User and Profile API
app.use("/api/v1/users", userRouter);

// Tweet API
app.use("/api/v1/tweet", tweetRouter);

// Comment API
app.use("/api/v1/comment", commentRouter);

// Like API
app.use("/api/v1/likes", likeRouter);

// Feed and TimeLine APi
app.use("/api/v1/feed", feedRouter);

// Search API
app.use("/api/v1/search", searchRouter);

// Notification API
app.use("/api/v1/notification", notificationRouter);

// Media API
app.use("/api/v1/media", mediaRouter);

// seed data API endpoints
app.use("/api/seed/auth", seedAuth);

app.use("/api/seed/tweet", seedTweet);
