import express from "express";
import AuthController from "../controller/auth.controller";

const authController = new AuthController();

export const authRouter = express.Router();

authRouter.get("/signup", authController.signupController);

authRouter.post("/signup", authController.signinController);

authRouter.post("/signup", authController.updateController);

authRouter.post("/signup", authController.forgetController);
