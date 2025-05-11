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
} from "./routes";
import dotenv from "dotenv";
import cors from "cors";
//import { seedData } from "./seed/seed";

dotenv.config();

export const app: Application = express();

app.use(cors());
app.use(express.json());

// Seeding the data
//seedData();

// Authentication API
app.use("/api/v1/auth", authRouter); // Done

// Tweet API
app.use("/api/v1/tweet", tweetRouter); // Done

// Comment API
app.use("/api/v1/comment", commentRouter); // Done

// Like API
app.use("/api/v1/like", likeRouter); // Done

// Search API
app.use("/api/v1/search", searchRouter); // Done

// Follow/unfollow API
app.use("/api/v1/follow", followRouter); // Done

// Feed and TimeLine APi
app.use("/api/v1/feed", feedRouter);

// Notification API
app.use("/api/v1/notification", notificationRouter);

// Media API
app.use("/api/v1/media", mediaRouter);
