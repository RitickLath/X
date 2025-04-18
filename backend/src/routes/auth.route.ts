import express from "express";
import AuthController from "../controller/auth.controller";

const authController = new AuthController();

export const authRouter = express.Router();

// signup
authRouter.get("/signup", authController.signupController);

// signin
authRouter.post("/login", authController.signinController);

// update profile
authRouter.post("/update", authController.updateController);

// forget password
authRouter.post("/forget", authController.forgetController);
