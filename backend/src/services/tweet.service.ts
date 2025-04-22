import mongoose from "mongoose";
import { TweetRepository } from "../repository/tweet.repository";
import { extractTags } from "../utils";
import { User } from "../models";

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

  async getTweets(userId: string, page: number) {
    try {
      // Step 1: Log intent to fetch tweets
      console.log(
        "Service Layer: Step-1 - Fetching tweets for user:",
        userId,
        "Page:",
        page
      );

      // Step 2: Fetch tweets from repository
      const tweets = await tweetRepository.getTweets(userId, page);
      console.log(
        "Service Layer: Step-2 - Tweets fetched from repository, count:",
        tweets.length
      );

      // Step 3: Check if no tweets found, validate user existence
      if (tweets.length === 0) {
        const user = await tweetRepository.findUserById(userId);
        console.log("Service Layer: Step-3 - Checking if user exists");

        if (!user) {
          console.log("Service Layer: Step-4 - User not found");
          return { success: false, message: "User does not exist", data: [] };
        }

        console.log("Service Layer: Step-4 - User exists but no tweets found");
        return { success: true, message: "No tweets found", data: [] };
      }

      // Step 4: Success - return tweets
      console.log("Service Layer: Step-5 - Tweets and user validated");
      return {
        success: true,
        message: "Tweets fetched successfully",
        data: tweets,
      };
    } catch (error: any) {
      // Step 6: Error handling
      console.error("Service Layer: Step-Error -", error.message);
      throw new Error("Service error during tweet fetching");
    }
  }
}

