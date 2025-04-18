import { Request, Response } from "express";
import AuthService from "../services/auth.service";

const authService = new AuthService();

export default class AuthController {
  async signupController(req: Request, res: Response) {
    try {
      // Make database call
      authService.signupService();
      res.status(200).json({ success: true });
    } catch (error) {
      console.log("Error From Auth Controller" + error);
      res.status(401).json({ success: false });
    }
  }

  async signinController(req: Request, res: Response) {
    try {
      // Make database call
    } catch (error) {
      console.log("Error From Auth Controller");
      res.status(401).json({ success: false });
    }
  }

  async updateController(req: Request, res: Response) {
    try {
      // Make database call
    } catch (error) {
      console.log("Error From Auth Controller");
      res.status(401).json({ success: false });
    }
  }

  async forgetController(req: Request, res: Response) {
    try {
      // Make database call
    } catch (error) {
      console.log("Error From Auth Controller");
      res.status(401).json({ success: false });
    }
  }
}
