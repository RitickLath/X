import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { Isignup } from "../utils";

const authService = new AuthService();

export default class AuthController {
  async signupController(req: Request, res: Response) {
    try {
      // Step 1: Extract data from Body
      const { username, email, password }: Isignup = req.body || {};
      console.log("Controller Layer: Step-1");

      // Step-2: Pass Data to Service Layer for allpying business logics
      const result = await authService.signupService(username, email, password);
      console.log("Controller Layer: Step-2");

      // Step-3: Return response
      res.status(result.success ? 200 : 400).json(result);
    } catch (error: any) {
      console.error("Error in AuthController - Signup:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async signinController(req: Request, res: Response) {
    try {
      // Step 1: Extract data from Body
      const { email, password }: Isignup = req.body || {};
      console.log("Controller Layer: Step-1");

      // Step-2: Pass Data to Service Layer for applying business logics
      const result = await authService.signinservice(email, password);
      console.log("Controller Layer: Step-2");

      // Step-3: Return response
      res.status(result.success ? 200 : 400).json(result);
    } catch (error: any) {
      console.log("Error Occured in AuthController - Signin:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateController(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.id || "6803dd52bc9ebeb70f34399d";
      const { bio, username } = req.body || {};

      const result = await authService.updateservice(bio, userId, username);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error: any) {
      console.error("Error in AuthController - Signup:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
