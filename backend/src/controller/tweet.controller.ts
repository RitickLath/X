import { Request, Response } from "express";
import { TweetService } from "../services/tweet.service";

const tweetService = new TweetService();

export class TweetController {
  // Controller for posting a tweet
  async tweetPostController(req: Request, res: Response) {
    // Step-1: Extract the data
    const author = req.id;
    const { content } = req.body || {};
    console.log("Controller: Step-1 - Extracted author and content"); // console

    if (!author || !content) {
      res.status(400).json({
        success: false,
        message: "Author and Content are required Field.",
      });
      return;
    }

    try {
      // Step-2 Pass the data to Service Layer
      const response = await tweetService.tweetPostService(author, content);
      console.log("Controller: Step-2 - Service response received"); // console

      // Step-3: Return the response (Conditional)
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client"); // console
    } catch (error: any) {
      // Step-1: Error Handing
      console.error("Controller: Step-Error -", error.message); // consolr
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // Controller for getting tweets
  async getTweetController(req: Request, res: Response) {
    // Step-1: Extract the data
    const author = req.params.userId;
    const page = Number(req.query.page) || 0;
    console.log("Controller: Step-1 - Extracted userId and page:"); // console

    if (!author) {
      res.status(400).json({
        success: false,
        message: "Not getting all the required Field.",
      });
      return;
    }

    try {
      // Step-2 Pass the data to Service Layer
      const response = await tweetService.getTweets(author, page);
      console.log("Controller: Step-2 - Service response received"); // console

      // Step-3: Return the response (Conditional)
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client"); // console
    } catch (error: any) {
      // Step-1: Error Handing
      console.error("Controller: Step-Error -", error.message); // console
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // Controller for retweeting
  async retweetController(req: Request, res: Response) {
    // Step-1: Extract the data
    const author = req.id;
    const tweetId = req.params.tweetId;
    console.log("Controller: Step-1 - Extracted author and tweetId:"); // console

    if (!author || !tweetId) {
      res.status(400).json({
        success: false,
        message: "Not getting all the required Field.",
      });
      return;
    }

    try {
      // Step-2 Pass the data to Service Layer
      const response = await tweetService.retweet(author, tweetId);
      console.log("Controller: Step-2 - Service response received"); // console

      // Step-3: Return the response (Conditional)
      res.status(response.success ? 200 : 400).json(response);
      console.log("Controller: Step-3 - Response sent to client"); // console
    } catch (error: any) {
      // Step-1: Error Handing
      console.error("Controller: Step-Error -", error.message); // console
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
