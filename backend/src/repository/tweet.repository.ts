import mongoose from "mongoose";
import { HashTag, Tweet, User } from "../models";
import { undefined } from "zod";

export class TweetRepository {
  // Create Tweet + Update the already present hashtags in hashtag document with the tweetId and add new Hashtag
  async createTweetWithHashtags(
    content: string,
    author: mongoose.Types.ObjectId,
    hashtagStrings: string[]
  ) {
    const isProd = process.env.NODE_ENV === "production";

    // since the transaction doesn't works in local environment so we will use atoicity feature in Production.
    const session = isProd ? await mongoose.startSession() : null;
    if (session) session.startTransaction();

    try {
      // Step 1: Create tweet without hashtags
      const tweetCreate = await Tweet.create(
        [{ content, author, hashtags: [] }],
        session ? { session } : {}
      );
      const createdTweet = tweetCreate[0];
      console.log("Repository Layer: Step-1 - Tweet created");

      const hashtagIds: mongoose.Types.ObjectId[] = [];

      // Step 2: Upsert hashtags and link tweetId (upsert: true -> helps to insert the doc if not exists already, new:true -> to provide update hashtag)
      for (const rawTag of hashtagStrings) {
        const tag = rawTag.toLowerCase().trim();

        const hashtag = await HashTag.findOneAndUpdate(
          { tag },
          { $addToSet: { tweetIds: createdTweet._id } },
          { new: true, upsert: true, ...(session && { session }) }
        );
        // @ts-ignore
        hashtagIds.push(hashtag._id);
      }
      console.log(
        "Repository Layer: Step-2 - Hashtags upserted and tweet linked"
      );

      // Step 3: Update tweet with hashtag ObjectIds
      createdTweet.hashtags = hashtagIds;
      await createdTweet.save(session ? { session } : {});
      console.log("Repository Layer: Step-3 - Tweet updated with hashtag IDs");

      // Step 4: Commit transaction
      if (session) {
        await session.commitTransaction();
        session.endSession();
      }
      console.log("Repository Layer: Step-4 - Transaction committed");

      return createdTweet;
    } catch (error: any) {
      // Step 5: Rollback transaction and handle error
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
      console.error(
        "Repository Layer: Step-5 - Error during tweet creation:",
        error.message
      );
      throw new Error("Failed to create tweet with hashtags");
    }
  }

  async findUserById(userId: string) {
    try {
      // Step 1: Find user by ID
      const user = await User.findById(userId).select("-password");
      console.log("Repository Layer: Step-1 - User lookup complete");
      return user;
    } catch (error: any) {
      console.error(
        "Repository Layer: Step-2 - Error finding user:",
        error.message
      );
      throw new Error("Failed to find user");
    }
  }

  async getTweets(userId: string, page: number) {
    try {
      // Step-1: Get Tweets
      const tweets = await Tweet.find({ author: userId })
        .select("-hashtags")
        .populate("author", "username")
        .populate("comments")
        .limit(10)
        .skip(10 * page);

      console.log("Repository Layer: Step-2 - Tweets query successful, found:");

      return tweets;
    } catch (error: any) {
      console.error(
        "Repository Layer: Step-Error - Failed to get tweets:",
        error.message
      );
      throw new Error("Failed to get tweets from DB");
    }
  }
}

/**
 * createTweetWithHashtags:- Creates a new tweet and associates it with relevant hashtags.
 *
 * This function performs the following steps:
 * 1. Creates a tweet document without any hashtags.
 * 2. Iterates over the provided list of hashtags:
 *    - If the hashtag already exists, updates its tweetIds array by adding the new tweet.
 *    - If it doesn't exist, creates a new hashtag document with the tweetId.
 * 3. Updates the tweet document with the ObjectIds of all associated hashtags.
 *
 * If the environment is production, all operations are executed inside a MongoDB transaction
 * to ensure atomicity. Transactions are skipped in local/dev environments due to limitations
 * with single-node MongoDB setups (i.e., lack of replica set).
 */
