import express from "express";
import AuthController from "../controller/auth.controller";

const authController = new AuthController();

export const authRouter = express.Router();

// signup
authRouter.post("/signup", authController.signupController);

// signin
authRouter.post("/signin", authController.signinController);

// update profile
//authRouter.post("/update", authController.updateController);

// forget password
//authRouter.post("/forget", authController.forgetController);
