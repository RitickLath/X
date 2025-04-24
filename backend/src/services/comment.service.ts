import { CommentRepository } from "../repository/comment.repository";

const commentRepository = new CommentRepository();

export class CommentService {
  async commentOnTweet(userId: String, tweetId: String, comment: String) {
    // Step-1: Checking Require Field
    console.log("Service: Step-1 - Validating author existence"); // console
    if (!userId || !tweetId || !comment) {
      return {
        success: false,
        message: "User ID, Tweet ID, and Comment are required.",
      };
    }

    // Step-2: Checking the comment Length
    console.log("Service: Step-2 - Validating comment Length"); // console
    if (comment.trim().length < 1) {
      return {
        success: false,
        message: "Comment cannot be empty.",
      };
    }

    try {
      // Step-3: Validate userId
      console.log("Service: Step-3 - Validating User existence"); // console
      const user = await commentRepository.findById(userId, "user");
      if (!user) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      // Step-4: Validate TweetId
      console.log("Service: Step-4 - Validating tweet existence"); // console
      const tweet = await commentRepository.findById(tweetId, "tweet");
      if (!tweet) {
        return {
          success: false,
          message: "Tweet not found.",
        };
      }

      // Step-5: Add the Comment to the comment model
      console.log("Service: Step-5 - Creating comment"); // console
      const newComment = await commentRepository.createComment(
        userId,
        tweetId,
        comment,
        "comment"
      );

      // Step-5: Return the response.
      return {
        success: true,
        message: "Comment posted successfully.",
        data: newComment,
      };
    } catch (error: any) {
      // Step-Error: Handle Service Error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during comment Creation");
    }
  }

  async replyOnComment(userId: String, commentId: String, comment: String) {
    // Step-1: Checking Require Field
    console.log("Service: Step-1 - Validating author existence"); // console
    if (!userId || !commentId || !comment) {
      return {
        success: false,
        message: "User ID, Tweet ID, and Comment are required.",
      };
    }

    // Step-2: Checking the comment Length
    console.log("Service: Step-2 - Validating comment Length"); // console
    if (comment.trim().length < 1) {
      return {
        success: false,
        message: "Comment cannot be empty.",
      };
    }

    try {
      // Step-3: Validate userId
      console.log("Service: Step-3 - Validating User existence"); // console
      const user = await commentRepository.findById(userId, "user");
      if (!user) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      // Step-4: Validate commentId
      console.log("Service: Step-4 - Validating tweet existence"); // console
      const parentComment = await commentRepository.findById(
        commentId,
        "comment"
      );
      if (!parentComment) {
        return {
          success: false,
          message: "Comment not found.",
        };
      }

      // Step-5: Add the Comment to the comment model
      console.log("Service: Step-5 - Creating comment"); // console
      const newComment = await commentRepository.createComment(
        userId,
        commentId,
        comment,
        "reply"
      );

      // Step-5: Return the response.
      return {
        success: true,
        message: "Reply posted successfully.",
        data: newComment,
      };
    } catch (error: any) {
      // Step-Error: Handle Service Error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during comment Creation");
    }
  }

  async getTweet(tweetId: String) {
    // Step-1: Checking Require Field
    console.log("Service: Step-1 - Validating tweetId existence"); // console
    if (!tweetId) {
      return {
        success: false,
        message: "Tweet ID is required.",
      };
    }
    try {
      // Step-2: Check if tweetId is valid
      console.log("Service: Step-2 - Checking if the tweetId exists"); // console
      const tweet = await commentRepository.findById(tweetId, "tweet");
      console.log(tweet);
      if (!tweet) {
        console.log("hell");
        return {
          success: false,
          message: "Tweet not found.",
        };
      }

      // Step-2: Fetch the comments
      console.log("Service: Step-3 - Fetching comments"); // console
      const comments = await commentRepository.getComments(tweetId);

      return {
        success: true,
        message: "Comments retrieved successfully.",
        data: comments,
      };
    } catch (error: any) {
      // Step-Error: Handle Service Error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during getting Comments");
    }
  }
}
