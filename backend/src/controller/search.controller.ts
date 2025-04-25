import { Request, Response } from "express";
import { SearchService } from "../services/search.service";

const searchService = new SearchService();

export class SearchController {
  async searchUsers(req: Request, res: Response) {
    // Step-1: Extract query for users
    const query = req.query.q as string;
    console.log("Controller: Step-1 - Extracted query for users:", query); // console

    if (!query) {
      res.status(400).json({
        success: false,
        message: "Query parameter 'q' is required to search users.",
      });
      return;
    }

    try {
      // Step-2: Pass query to SearchService to search users
      console.log(
        "Controller: Step-2 - Searching for users with query:",
        query
      ); // console
      const response = await searchService.searchUsers(query);

      // Step-3: Send back the response from service
      console.log("Controller: Step-3 - Service response received:", response); // console
      res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
      // Step-Error: Error handling
      console.error("Controller: Step-Error -", error.message); // console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async searchHashtags(req: Request, res: Response) {
    // Step-1: Extract query for hashtags
    const query = req.query.q as string;
    console.log("Controller: Step-1 - Extracted query for hashtags:", query); // console

    if (!query) {
      res.status(400).json({
        success: false,
        message: "Query parameter 'q' is required to search hashtags.",
      });
      return;
    }

    try {
      // Step-2: Pass query to SearchService to search hashtags
      console.log(
        "Controller: Step-2 - Searching for hashtags with query:",
        query
      ); // console
      const response = await searchService.searchHashtags(query);

      // Step-3: Send back the response from service
      console.log("Controller: Step-3 - Service response received:", response); // console
      res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
      // Step-Error: Error handling
      console.error("Controller: Step-Error -", error.message); // console
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async suggestHashtags(req: Request, res: Response) {
    // Step-1: Extract query for hashtag suggestions
    const query = req.query.q as string;
    console.log(
      "Controller: Step-1 - Extracted query for hashtag suggestions:",
      query
    ); // console

    if (!query) {
      res.status(400).json({
        success: false,
        message: "Query parameter 'q' is required to suggest hashtags.",
      });
      return;
    }

    try {
      // Step-2: Pass query to SearchService to get hashtag suggestions
      console.log(
        "Controller: Step-2 - Suggesting hashtags with query:",
        query
      ); // console
      const response = await searchService.suggestHashtags(query);

      // Step-3: Send back the response from service
      console.log("Controller: Step-3 - Service response received:", response); // console
      res.status(response.success ? 200 : 400).json(response);
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
