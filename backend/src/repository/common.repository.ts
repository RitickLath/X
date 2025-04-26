import mongoose from "mongoose";
import { Comment, Tweet, User } from "../models";

type ModelName = "user" | "tweet" | "comment" | "hashtag";

export class CommonRepository {
  static async findById(userId: string, model: ModelName) {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return null;
      }

      let response;
      //   Step-1: If model choosed is User get by User
      if (model == "user") {
        response = await User.findOne({ _id: userId });
      }
      //   Step-2: If model choosed is Tweet get by Tweet
      else if (model == "tweet") {
        response = await Tweet.findOne({ _id: userId });
      }
      //   Step-2: If model choosed is Tweet get by Tweet
      else if (model == "comment") {
        response = await Comment.findOne({ _id: userId });
      }
      console.log("Repository: Step-1 - User/Tweet/Comment lookup complete");
      return response;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - User/Tweet/Comment lookup failed:",
        error.message
      );
      throw new Error("Failed to find user/tweet");
    }
  }
}

