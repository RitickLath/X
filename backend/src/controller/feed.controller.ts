import { Request, Response } from "express";
import { FeedService } from "../services/feed.service";

const feedService = new FeedService();

export class FeedController {
  async getLatest(req: Request, res: Response) {
    const userId = req.id || "";
    const { page } = req.query || 0;
    // console.log(page);

    console.log("Controller: Step-1 - Extracted userId"); // console

    try {
      // Step-2: Pass the data to service layer
      const response = await feedService.getLatest(userId, Number(page));
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

  async getTrending(req: Request, res: Response) {
    const userId = req.id || "";
    const { page } = req.query || 0;

    console.log("Controller: Step-1 - Extracted userId"); // console

    try {
      // Step-2: Pass the data to service layer
      const response = await feedService.getTrending(userId, Number(page));
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

  async getFollowingTweet(req: Request, res: Response) {
    const userId = req.id || "";
    const { page } = req.query || 0;

    console.log("Controller: Step-1 - Extracted userId"); // console

    try {
      // Step-2: Pass the data to service layer
      const response = await feedService.getFollowingTweet(
        userId,
        Number(page)
      );
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
