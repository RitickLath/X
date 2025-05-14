import { Request, Response } from "express";
import { LikeService } from "../services/like.service";
import { AuthenticatedRequest } from "../utils/interfaceType";

const likeService = new LikeService();

export class LikeController {
  async likeTweet(req: AuthenticatedRequest, res: Response) {
    // Step-1: Extract the data
    const userId = req.id || "";
    const { tweetId } = req.params;
    console.log("Controller: Step-1 - Extracted tweetId and userId"); // console

    try {
      // Step-2: Pass the data to service layer
      const response = await likeService.likeTweet(userId, tweetId);
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

  async likeComment(req: AuthenticatedRequest, res: Response) {
    // Step-1: Extract the data
    const userId = req.id || "";
    const { commentId } = req.params;
    console.log("Controller: Step-1 - Extracted commentId and userId"); // console

    try {
      // Step-2: Pass the data to service layer
      const response = await likeService.likeComment(userId, commentId);
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

  // will change this
  async getLikedUsers(req: Request, res: Response) {
    const { id, type } = req.query;

    console.log("Controller: Step-1 - Extracted tweetId from query params");

    try {
      // Step-2: Pass data to service layer
      const response = await likeService.getLikedUsers(
        id as string,
        type as string
      );

      console.log("Controller: Step-2 - Service response received");

      // Step-3: Return response
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client");
    } catch (error: any) {
      console.error("Controller: Step-Error -", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
