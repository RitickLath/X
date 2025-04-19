import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { Isignup } from "../utils";

const authService = new AuthService();

export default class AuthController {
  async signupController(req: Request, res: Response) {
    try {
      // Step 1: Extract data from Body
      const { username, email, password }: Isignup = req.body;
      console.log("Controller Layer: Step-1");

      // Step-2: Pass Data to Service Layer for allpying business logics
      const result = await authService.signupService(username, email, password);
      console.log("Controller Layer: Step-2");

      res.status(result.success ? 200 : 400).json(result);
    } catch (error: any) {
      console.error("Error in AuthController - Signup:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
