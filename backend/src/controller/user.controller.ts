import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  // Get Profile Controller
  async getProfile(req: Request, res: Response) {
    const { userId } = req.params;
    const author = req.id;
    console.log("Controller: Step-1 - Extracted tweetId and userId"); // console

    try {
      // Step-2: Pass the data to service layer
      const response = await userService.getProfile(userId, author);
      console.log("Controller: Step-2 - Service response received"); // console

      // Step-3: Return the response (Conditional)
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client"); // console
    } catch (error: any) {
      // Step-Error: Error handling
      console.error("Controller: Step-Error -", error.message); // console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
  // Follow/Unfollow User Controller
  async followUnfollowUser(req: Request, res: Response) {
    try {
      // Step-2: Pass the data to service layer
      const response = await userService.followUnfollowUser();
      console.log("Controller: Step-2 - Service response received"); // console

      // Step-3: Return the response (Conditional)
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client"); // console
    } catch (error: any) {
      // Step-Error: Error handling
      console.error("Controller: Step-Error -", error.message); // console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
  // Get Followers Controller
  async getFollowers(req: Request, res: Response) {
    try {
      // Step-2: Pass the data to service layer
      const response = await userService.getFollowers();
      console.log("Controller: Step-2 - Service response received"); // console

      // Step-3: Return the response (Conditional)
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client"); // console
    } catch (error: any) {
      // Step-Error: Error handling
      console.error("Controller: Step-Error -", error.message); // console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
  // Get Following Controller
  async getFollowing(req: Request, res: Response) {
    try {
      // Step-2: Pass the data to service layer
      const response = await userService.getFollowing();
      console.log("Controller: Step-2 - Service response received"); // console

      // Step-3: Return the response (Conditional)
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client"); // console
    } catch (error: any) {
      // Step-Error: Error handling
      console.error("Controller: Step-Error -", error.message); // console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
  // Get Follow/Following Count Controller
  async getFollowFollowingCount(req: Request, res: Response) {
    try {
      // Step-2: Pass the data to service layer
      const response = await userService.getFollowFollowingCount();
      console.log("Controller: Step-2 - Service response received"); // console

      // Step-3: Return the response (Conditional)
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client"); // console
    } catch (error: any) {
      // Step-Error: Error handling
      console.error("Controller: Step-Error -", error.message); // console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
