import express from "express";
import AuthController from "../controller/auth.controller";
import { authMiddleware } from "../middlewares";

const authController = new AuthController();

export const authRouter = express.Router();

// signup
authRouter.post("/signup", authController.signupController);

// signin
authRouter.post("/signin", authController.signinController);

// validate token
authRouter.get("/token", authMiddleware, (req, res) => {
  res.status(200).json({ status: true, message: "Token Validated" });
});

// update profile

authRouter.post("/update", authMiddleware, authController.updateController);

// forget password
//authRouter.post("/forget", authController.forgetController);

// Get user profile by ID
// get the username, bio, edit option, when joined, total follower, total followings, posts, replies, saved
// recent 10 recent posts atleast.
// recent 10 replies.
// recent 10 saved tweets with option to ascend and descend
authRouter.get("/profile", authMiddleware, (req, res) => {});
