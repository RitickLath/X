import mongoose from "mongoose";
import { User, Tweet, Comment, Like } from "../models";
import { response } from "express";

export class LikeRepository {
  async findById(userId: String, model: string) {
    try {
      // Step-0: Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log("Repository: Step-0 - Invalid ObjectId");
        return null;
      }

      let response;

      // Step-1: Lookup based on model type
      if (model === "user") {
        response = await User.findOne({ _id: userId });
        console.log("Repository: Step-1 - User lookup complete");
      }
      if (model === "tweet") {
        response = await Tweet.findOne({ _id: userId });
        console.log("Repository: Step-2 - Tweet lookup complete");
      }
      if (model === "comment") {
        response = await Comment.findOne({ _id: userId });
        console.log("Repository: Step-3 - Comment lookup complete");
      }

      return response;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Model lookup failed:",
        error.message
      );
      throw new Error("Failed to find user/tweet/comment");
    }
  }

  async findLike(likedBy: String, id: String, type: string) {
    try {
      // Step-1: Check if like already exists
      let existingLike;

      if (type === "tweet") {
        existingLike = await Like.findOne({ likedBy, tweetId: id });
        console.log("Repository: Step-1 - Tweet like check complete");
      }
      if (type === "comment") {
        existingLike = await Like.findOne({ likedBy, commentId: id });
        console.log("Repository: Step-1 - Comment like check complete");
      }

      return existingLike;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Find like failed:",
        error.message
      );
      throw new Error("Failed to find like");
    }
  }

  async deleteLike(likedBy: String, id: String, type: string) {
    try {
      // Step-1: Delete like based on type
      let response;

      if (type === "tweet") {
        response = await Like.findOneAndDelete({ likedBy, tweetId: id });
        console.log("Repository: Step-1 - Tweet like deleted");
      }
      if (type === "comment") {
        response = await Like.findOneAndDelete({ likedBy, commentId: id });
        console.log("Repository: Step-1 - Comment like deleted");
      }

      return response;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Delete like failed:",
        error.message
      );
      throw new Error("Failed to delete like");
    }
  }

  async createLike(likedBy: String, id: String, type: string) {
    try {
      // Step-1: Create like based on type
      let response;

      if (type === "tweet") {
        response = await Like.create({ likedBy, tweetId: id });
        console.log("Repository: Step-1 - Tweet like created");
      }
      if (type === "comment") {
        response = await Like.create({ likedBy, commentId: id });
        console.log("Repository: Step-1 - Comment like created");
      }

      return response;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Create like failed:",
        error.message
      );
      throw new Error("Failed to create like");
    }
  }

  async getLikes(id: String, type: String) {
    try {
      let response;
      if (type == "tweet") {
        response = await Like.find({ tweetId: id }).populate(
          "likedBy",
          "username"
        );
      }
      if (type == "comment") {
        response = await Like.find({ commentId: id }).populate(
          "likedBy",
          "username"
        );
      } else {
        response = null;
      }
      return response;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - like Count failed:",
        error.message
      );
      throw new Error("Failed to fetch likes");
    }
  }
}
