import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { AuthenticatedRequest } from "../utils/interfaceType";

const commentService = new CommentService();

export class CommentController {
  async commentOnTweet(req: AuthenticatedRequest, res: Response) {
    // Step-1: Extract the data
    const userId = req.id || "";
    const { tweetId } = req.params;
    const { comment } = req.body || "";
    console.log("Controller: Step-1 - Extracted userId, tweetId, comment"); // console

    try {
      // Step-2 Pass the data to Service Layer
      const response = await commentService.commentOnTweet(
        userId,
        tweetId,
        comment
      );
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

  async replyOnComment(req: AuthenticatedRequest, res: Response) {
    // Step-1: Extract the data
    const userId = req.id || "";
    const { commentId } = req.params;
    const { comment } = req.body || {};
    console.log("Controller: Step-1 - Extracted userId, commentId, comment"); // console

    try {
      // Step-2 Pass the data to Service Layer
      const response = await commentService.replyOnComment(
        userId,
        commentId,
        comment
      );
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

  async getTweetOnComment(req: Request, res: Response) {
    // Step-1: Extract the data
    const { tweetId } = req.params;
    console.log("Controller: Step-1 - Extracted tweetId"); // console

    try {
      // Step-2: Pass the data to service layer
      const response = await commentService.getTweet(tweetId);
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
}
