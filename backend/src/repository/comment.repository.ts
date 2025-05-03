import { Comment, Tweet, User } from "../models";
import mongoose from "mongoose";

export class CommentRepository {
  async findById(userId: string, model: string) {
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
      if (model == "tweet") {
        response = await Tweet.findOne({ _id: userId });
      }
      if (model == "comment") {
        response = await Comment.findOne({ _id: userId });
      }
      console.log(response + " " + model + " " + userId);
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

  async createComment(
    author: string,
    id: string,
    comment: string,
    type: string
  ) {
    try {
      // Step-1: Create a comment
      let response;
      if (type == "reply") {
        response = await Comment.create({
          author,
          comment,
          commentId: id,
        });
        console.log("Repository: Step-1 - Reply creation complete.");
      }
      if (type == "comment") {
        response = await Comment.create({
          author,
          comment,
          tweetId: id,
        });
        console.log("Repository: Step-1 - Comment creation complete.");
      }

      // Update the count of comment in Tweet
      const commentCountUpdate = await Tweet.findById(id);
      if (commentCountUpdate) {
        commentCountUpdate.commentCount += 1;
        await commentCountUpdate.save();
      }

      return response;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Comment Creation Failed",
        error.message
      );
      throw new Error("Failed to create Comment");
    }
  }

  async getComments(tweetId: string) {
    try {
      // Step-1: Fetching the comments and populating
      const comments = await Comment.find({
        tweetId,
        commentId: { $exists: false },
      })
        .populate("author", "username")
        .sort({ createdAt: -1 });

      console.log("Repository: Step-1 - Comment fetch complete.");
      return comments;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Comment Fetch Failed",
        error.message
      );
      throw new Error("Failed to fetch Comment");
    }
  }
}

// we have not implemented the delete the comment repository and api too.
