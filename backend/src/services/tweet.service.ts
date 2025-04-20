import mongoose from "mongoose";
import { TweetRepository } from "../repository/tweet.repository";
import { extractTags } from "../utils";

const tweetRepository = new TweetRepository();

export class TweetService {
  async tweetPostService(userId: string, content: string) {
    try {
      // Step 1: Validate that user exists
      const user = await tweetRepository.findUserById(userId);
      console.log("Service Layer: Step-1");

      if (!user) {
        return { success: false, message: "Author doesn't exist." };
      }
      console.log("Service Layer: Step-2");

      // Step 2: Validate content length
      if (content.length > 270) {
        return {
          success: false,
          message: "Content must be less than 270 characters.",
        };
      }
      console.log("Service Layer: Step-3");

      // (v2) Make the abuse master service for good platform (abuse free)

      // Step 3: Extract hashtags from content
      const hashtagStrings = extractTags(content, "#");
      console.log("Service Layer: Step-4");

      // (v2) Mentions can be handled later
      // const mentions = extractTags(content, "@");

      // Step 4: Call repository to create tweet and handle hashtags
      const tweet = await tweetRepository.createTweetWithHashtags(
        content,
        new mongoose.Types.ObjectId(userId),
        hashtagStrings
      );
      console.log("Service Layer: Step-5");

      // Step 5: Return success response
      return {
        success: true,
        message: "Tweet posted successfully",
        data: tweet, // maybe we will not return the tweet as its not required. (will see)
      };
    } catch (error: any) {
      // Step 6: Catch and log error
      console.error("Error in TweetService:", error.message);
      throw new Error("Service error during tweet posting");
    }
  }
}
