import { Comment, Tweet } from "../models";
import { CommonRepository } from "../repository/common.repository";
import { LikeRepository } from "../repository/like.repository";

const likeRepository = new LikeRepository();
type ModelName = "user" | "tweet" | "comment" | "hashtag";

export class LikeService {
  async likeTweet(userId: string, tweetId: string) {
    // Step-1: Validating required fields
    console.log("Service: Step-1 - Validating required fields");
    if (!userId || !tweetId) {
      return {
        success: false,
        message: "User ID and Tweet ID are required.",
      };
    }

    try {
      // Step-2: Validate User existence
      console.log("Service: Step-2 - Validating User existence");
      const user = await CommonRepository.findById(userId, "user");
      if (!user) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      // Step-3: Validate Tweet existence
      console.log("Service: Step-3 - Validating Tweet existence");
      const tweet = await CommonRepository.findById(tweetId, "tweet");
      if (!tweet) {
        return {
          success: false,
          message: "Tweet not found.",
        };
      }

      // Step-4: Check if already liked
      console.log("Service: Step-4 - Checking if tweet is already liked");
      const existingLike = await likeRepository.findLike(
        userId,
        tweetId,
        "tweet"
      );

      let likeAction;
      let message;

      if (existingLike) {
        // Step-5: Unlike tweet
        console.log("Service: Step-5 - Unliking tweet");
        likeAction = await likeRepository.deleteLike(userId, tweetId, "tweet");
        message = "Tweet unliked successfully.";
      } else {
        // Step-5: Like tweet
        console.log("Service: Step-5 - Liking tweet");
        likeAction = await likeRepository.createLike(userId, tweetId, "tweet");
        message = "Tweet liked successfully.";
      }

      // Step-6: Return response
      console.log("Service: Step-6 - Like/unlike action completed");
      return {
        success: true,
        message,
        data: likeAction,
      };
    } catch (error: any) {
      // Step-Error: Catch service error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during like/unlike Tweet");
    }
  }

  async likeComment(userId: string, commentId: string) {
    // Step-1: Validating required fields
    console.log("Service: Step-1 - Validating required fields");
    if (!userId || !commentId) {
      return {
        success: false,
        message: "User ID and Comment ID are required.",
      };
    }

    try {
      // Step-2: Validate User existence
      console.log("Service: Step-2 - Validating User existence");
      const user = await CommonRepository.findById(userId, "user");
      if (!user) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      // Step-3: Validate Comment existence
      console.log("Service: Step-3 - Validating Comment existence");
      const comment = await CommonRepository.findById(commentId, "comment");
      if (!comment) {
        return {
          success: false,
          message: "Comment not found.",
        };
      }

      // Step-4: Check if already liked
      console.log("Service: Step-4 - Checking if comment is already liked");
      const existingLike = await likeRepository.findLike(
        userId,
        commentId,
        "comment"
      );

      let likeAction;
      let message;

      if (existingLike) {
        // Step-5: Unlike comment
        console.log("Service: Step-5 - Unliking comment");
        likeAction = await likeRepository.deleteLike(
          userId,
          commentId,
          "comment"
        );
        message = "Comment unliked successfully.";
      } else {
        // Step-5: Like comment
        console.log("Service: Step-5 - Liking comment");
        likeAction = await likeRepository.createLike(
          userId,
          commentId,
          "comment"
        );
        message = "Comment liked successfully.";
      }

      // Step-6: Return response
      console.log("Service: Step-6 - Like/unlike action completed");
      return {
        success: true,
        message,
        data: likeAction,
      };
    } catch (error: any) {
      // Step-Error: Catch service error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during like/unlike Comment");
    }
  }

  // will change this
  async getLikedUsers(id: string, type: string) {
    console.log("Service: Step-1 - Validating tweetId");
    if (!id || !type) {
      return {
        success: false,
        message: "Tweet ID and Type is required.",
      };
    }

    try {
      // Step-2: Validate existence
      console.log("Service: Step-2 - Checking if ID exists");
      let exists = null;

      if (type.toLowerCase() === "tweet") {
        exists = await Tweet.findById(id);
      } else if (type.toLowerCase() === "comment") {
        exists = await Comment.findById(id);
      } else {
        return {
          success: false,
          message: "Invalid type. Must be 'tweet' or 'comment'.",
        };
      }

      if (!exists) {
        return {
          success: false,
          message: `${type} not found.`,
        };
      }

      // Step-3: Fetch liked users
      console.log("Service: Step-3 - Fetching liked users from repository");
      const likedUsers = await likeRepository.getLikedUsers(
        id,
        type.toLowerCase()
      );

      return {
        success: true,
        message: "Liked users fetched",
        data: {
          users: likedUsers,
          count: likedUsers.length,
        },
      };
    } catch (error: any) {
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error while fetching liked users");
    }
  }
}
