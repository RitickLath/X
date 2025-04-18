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

export const app: Application = express();

app.use(express.json());

// Authentication API
app.use("/api/v1/auth", authRouter);
// User and Profile API
app.use("/api/v1/auth", userRouter);
// Tweet API
app.use("/api/v1/auth", tweetRouter);
// Comment API
app.use("/api/v1/auth", commentRouter);
// Like API
app.use("/api/v1/auth", likeRouter);
// Feed and TimeLine APi
app.use("/api/v1/auth", feedRouter);
// Search API
app.use("/api/v1/auth", searchRouter);
// Notification API
app.use("/api/v1/auth", notificationRouter);
// Media API
app.use("/api/v1/auth", mediaRouter);
