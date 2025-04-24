import { Request, Response } from "express";
import { LikeService } from "../services/like.service";

const likeService = new LikeService();

export class LikeController {
  async likeTweet(req: Request, res: Response) {
    // Step-1: Extract the data
    const { userId } = req.body;
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

  async likeComment(req: Request, res: Response) {
    // Step-1: Extract the data
    const { userId } = req.body;
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
}
