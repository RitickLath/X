import mongoose from "mongoose";
import { TweetRepository } from "../repository/tweet.repository";
import { extractTags } from "../utils";

const tweetRepository = new TweetRepository();

export class TweetService {
  // Service for posting a tweet
  async tweetPostService(author: string, content: string) {
    if (!author || !content) {
      return {
        success: false,
        message: "Author and content Both are required",
      };
    }

    try {
      // Step-1: Validate Author
      console.log("Service: Step-1 - Validating author existence"); // console
      const user = await tweetRepository.findUserById(author);
      if (!user) {
        return { success: false, message: "Author doesn't exist." };
      }

      // Step-2: Validate Content Length
      console.log("Service: Step-2 - Validating content length"); // console
      if (content.length > 270) {
        return {
          success: false,
          message: "Content must be under 270 characters.",
        };
      }

      // Step-3: Extract Hashtags
      console.log("Service: Step-3 - Extracting hashtags from content"); // console
      const hashtagStrings = extractTags(content, "#");

      // Step-4: Create Tweet
      console.log("Service: Step-4 - Creating tweet with hashtags"); // console
      const tweet = await tweetRepository.createTweetWithHashtags(
        content,
        new mongoose.Types.ObjectId(author),
        hashtagStrings
      );

      // Step-5: Return Success
      console.log("Service: Step-5 - Tweet created successfully"); // console
      return {
        success: true,
        message: "Tweet posted successfully",
        data: tweet,
      };
    } catch (error: any) {
      // Step-Error: Handle Service Error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during tweet posting");
    }
  }

  // Service for fetching tweets
  async getTweets(author: string, page: number) {
    try {
      // Step-1: Fetch Tweets
      console.log("Service: Step-1 - Fetching tweets from DB");
      const tweets = await tweetRepository.getTweets(author, page);

      // Step-2: Check Result
      console.log("Service: Step-2 - Tweets fetched, count:", tweets.length);
      if (tweets.length === 0) {
        console.log(
          "Service: Step-3 - No tweets found, checking user existence"
        );
        const user = await tweetRepository.findUserById(author);
        if (!user) {
          return { success: false, message: "User does not exist", data: [] };
        }
        return { success: true, message: "No tweets found", data: [] };
      }

      // Step-3: Return Tweets
      console.log("Service: Step-3 - Returning tweets to controller");
      return {
        success: true,
        message: "Tweets fetched successfully",
        data: tweets,
      };
    } catch (error: any) {
      // Step-Error: Handle Service Error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during tweet fetching");
    }
  }

  // Service for retweeting
  async retweet(author: string, tweetId: string) {
    try {
      if (!author || !tweetId) {
        return {
          success: false,
          message: "Login First and choose the tweet to retweet",
        };
      }
      // Step-1: Validate User and Tweet
      console.log("Service: Step-1 - Validating user and tweet existence");
      const user = await tweetRepository.findUserById(author);
      if (!user) {
        return { success: false, message: "User does not exist", data: [] };
      }

      const tweet = await tweetRepository.findTweet(tweetId);
      if (!tweet) {
        return { success: false, message: "Tweet does not exist", data: [] };
      }

      // Step-2: Create Retweet
      console.log("Service: Step-2 - Creating retweet entry");
      const retweet = await tweetRepository.retweet(author, tweetId);

      // Step-3: Return Retweet
      console.log("Service: Step-3 - Retweet created successfully");
      return {
        success: true,
        message: "Retweet successful",
        data: retweet,
      };
    } catch (error: any) {
      // Step-Error: Handle Service Error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during retweeting");
    }
  }
}
