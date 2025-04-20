import { Request, Response } from "express";
import { TweetService } from "../services/tweet.service";

const tweetService = new TweetService();

export class TweetController {
  async tweetPostController(req: Request, res: Response) {
    // @ts-ignore
    const userId = req.id || "6803dd52bc9ebeb70f34399d"; // putted one userId as not implemented auth middleware till now.
    const { content } = req.body;

    try {
      console.log("Controller Layer: Step-1 - Extracted userId and content");

      // Step-1: Pass to tweet post service
      const response = await tweetService.tweetPostService(userId, content);
      console.log("Controller Layer: Step-2 - Received response from service");

      // Step-2: return response
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller Layer: Step-3 - Response sent to client");
    } catch (error: any) {
      console.error("Controller Layer: Step-Error -", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
