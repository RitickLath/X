import { LikeRepository } from "../repository/like.repository";

const likeRepository = new LikeRepository();

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
      const user = await likeRepository.findById(userId, "user");
      if (!user) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      // Step-3: Validate Tweet existence
      console.log("Service: Step-3 - Validating Tweet existence");
      const tweet = await likeRepository.findById(tweetId, "tweet");
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
      const user = await likeRepository.findById(userId, "user");
      if (!user) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      // Step-3: Validate Comment existence
      console.log("Service: Step-3 - Validating Comment existence");
      const comment = await likeRepository.findById(commentId, "comment");
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

  async getCount(id: string, type: string) {
    // Step-1: Validating required fields
    console.log("Service: Step-1 - Validating required fields");
    if (!id || !type) {
      return {
        success: false,
        message: "ID and Type are required.",
      };
    }
    try {
      // Step-2: Check if the id exists
      console.log("Service: Step-2 - Validating Id existence");
      const idExists = await likeRepository.findById(id, type.toLowerCase());
      if (!idExists) {
        return {
          success: false,
          message: `${type} not found.`,
        };
      }

      // Step-3: Passing data to repository layer for getting likes details
      console.log("Service: Step-3 - Getting like details");
      const likes = await likeRepository.getLikes(id, type);
      return {
        success: true,
        message: "Likes fetched",
        data: { likes: likes, count: likes?.length },
      };
    } catch (error: any) {
      // Step-Error: Catch service error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during like Count");
    }
  }
}
