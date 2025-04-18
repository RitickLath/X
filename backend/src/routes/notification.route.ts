import express from "express";

export const notificationRouter = express.Router();

// get users notifications (based on last online time)
notificationRouter.get("/", (req, res) => {});

// mark notifications as read (maybe not requried)
notificationRouter.patch("/", (req, res) => {});
