import mongoose from "mongoose";
import { HashTag, Tweet, User } from "../models";

export class TweetRepository {
  // Step-wise tweet creation with hashtag linkage
  async createTweetWithHashtags(
    content: string,
    author: mongoose.Types.ObjectId,
    hashtagStrings: string[]
  ) {
    const isProd = process.env.NODE_ENV === "production";
    const session = isProd ? await mongoose.startSession() : null;
    if (session) session.startTransaction();

    try {
      // Step-1: Create Tweet
      const tweetCreate = await Tweet.create(
        [{ content, author }],
        session ? { session } : {}
      );
      const createdTweet = tweetCreate[0];
      console.log("Repository: Step-1 - Tweet created"); // console

      // Step-2: Add tweetId to user
      const user = await User.findOne({ _id: author });
      if (!user) {
        return { success: false, message: "Author doesn't exist." };
      } else {
        // @ts-ignore
        user.tweets?.push(createdTweet._id);
        await user.save(session ? { session } : {});
      }
      console.log("Repository: Step-2 - TweetId added to user"); // console

      // Step-3: Upsert Hashtags and Link to Tweet

      for (const rawTag of hashtagStrings) {
        const tag = rawTag.toLowerCase().trim();
        const hashtag = await HashTag.findOneAndUpdate(
          { tag },
          { $addToSet: { tweetIds: createdTweet._id } }, // update the array
          { new: true, upsert: true, ...(session && { session }) }
        );
      }
      console.log("Repository: Step-3 - Hashtags upserted and linked"); //console

      // Step-4: Commit Transaction
      if (session) {
        await session.commitTransaction();
        session.endSession();
        console.log("Repository: Step-4 - Transaction committed");
      }

      return createdTweet;
    } catch (error: any) {
      if (session) {
        await session.abortTransaction();
        session.endSession();
        console.error("Repository: Step-5 - Transaction aborted");
      }
      console.error("Repository: Step-Error -", error.message);
      throw new Error("Failed to create tweet with hashtags");
    }
  }

  // Find user by ID
  async findUserById(author: string) {
    try {
      // Step-1: Find User
      const user = await User.findById(author)
        .select("-password")
        .populate("tweets");
      console.log("Repository: Step-1 - User lookup complete");
      return user;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - User lookup failed:",
        error.message
      );
      throw new Error("Failed to find user");
    }
  }

  // Fetch tweets with pagination
  async getTweets(author: string, page: number) {
    try {
      // Step-1: Fetch Tweets
      const tweets = await Tweet.find({ author: author })
        .select("-hashtags")
        .populate("author", "username")
        .limit(10)
        .skip(10 * page);

      console.log(
        `Repository: Step-1 - Fetched ${tweets.length} tweets (Page ${page})`
      );
      return tweets;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Failed to fetch tweets:",
        error.message
      );
      throw new Error("Failed to get tweets from DB");
    }
  }

  // Find a tweet by ID
  async findTweet(tweetId: string) {
    try {
      // Step-1: Find Tweet
      const tweet = await Tweet.findById(tweetId);
      console.log("Repository: Step-1 - Tweet lookup complete");
      return tweet;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Tweet lookup failed:",
        error.message
      );
      throw new Error("Failed to find tweet");
    }
  }

  // Create a retweet
  async retweet(author: string, tweetId: string) {
    try {
      // Step-1: Create Retweet
      const retweet = await Tweet.create({
        retweet: tweetId,
        author,
        original: false,
      });
      // Update the count of retweet
      const originalTweet = await Tweet.findById(tweetId);
      if (originalTweet) {
        originalTweet.retweetCount += 1;
      }

      console.log("Repository: Step-1 - Retweet created");
      return retweet;
    } catch (error: any) {
      console.error("Repository: Step-Error - Retweet failed:", error.message);
      throw new Error("Failed to add retweet");
    }
  }
}
