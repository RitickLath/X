import express, { Request, Response } from "express";
import { Tweet, HashTag } from "../models";
import { extractTags } from "../utils";

export const seedTweet = express.Router();

seedTweet.post("/", async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const createdTweets = [];

    for (let i = 0; i < data.length; i++) {
      const { content, author } = data[i];
      const hashtagStrings = extractTags(content, "#");

      // Step-1: Create the tweet first (without hashtags)
      const tweet = await Tweet.create({
        content,
        author,
        original: true,
      });

      // Step-2: Link tweet to hashtags
      for (const rawTag of hashtagStrings) {
        const tag = rawTag.toLowerCase().trim();
        const hashtag = await HashTag.findOneAndUpdate(
          { tag },
          { $addToSet: { tweetIds: tweet._id } },
          { new: true, upsert: true }
        );
      }

      // Step-3: Update total tweet array
      createdTweets.push(tweet);
    }

    res.status(200).json({ success: true, data: createdTweets });
  } catch (err: any) {
    console.error("Seed Tweet Error:", err.message);
    res.status(500).json({ success: false, message: "Tweet seed failed" });
  }
});
