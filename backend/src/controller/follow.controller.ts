import { Request, Response } from "express";
import { FollowService } from "../services/follow.service";

const followService = new FollowService();

export class FollowController {
  async toggleFollow(req: Request, res: Response) {
    // Step-1: Extract userId from params and author from req.id
    const { userId } = req.params;
    const author = req.id; 

    try {
      // Step-2: Call service to toggle follow/unfollow
      console.log("Controller: Step-2 - Calling service to toggle follow"); //console
      const response = await followService.toggleFollow(author, userId);

      // Step-3: Send response based on success
      console.log("Controller: Step-3 - Sending success response"); //console
      res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
      // Step-Error: Handle service-level or unexpected errors
      console.error("Controller: Step-Error -", error.message); //console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async getFollowers(req: Request, res: Response) {
    // Step-1: Extract userId from params
    const { userId } = req.params;
    console.log("Controller: Step-1 - Extracted UserID"); //console

    try {
      // Step-2: Call service to get followers
      console.log("Controller: Step-2 - Calling service to get followers"); //console
      const response = await followService.getFollowers(userId);

      // Step-3: Return followers in response
      console.log("Controller: Step-3 - Sending success response"); //console
      res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
      // Step-Error: Handle service-level or unexpected errors
      console.error("Controller: Step-Error -", error.message); //console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
