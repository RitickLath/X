import express from "express";
import AuthController from "../controller/auth.controller";
import { authMiddleware } from "../middlewares";

const authController = new AuthController();

export const authRouter = express.Router();

// signup
authRouter.post("/signup", authController.signupController);

// signin
authRouter.post("/signin", authController.signinController);

// update profile

authRouter.post("/update", authMiddleware, authController.updateController);

// forget password
//authRouter.post("/forget", authController.forgetController);

// Get user profile by ID
authRouter.get("/profile", authMiddleware, (req, res) => {});
