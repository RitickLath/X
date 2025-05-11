import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { User, Tweet, Like, HashTag, Comment } from "../models";

export const seedData = async () => {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Tweet.deleteMany({}),
      Like.deleteMany({}),
      Comment.deleteMany({}),
      HashTag.deleteMany({}),
    ]);
    console.log("🧹 Cleared old data");

    const users = [];
    for (let i = 0; i < 20; i++) {
      const password = await bcrypt.hash("StrongP@ssw0rd", 8);
      const user = await User.create({
        username: faker.internet.userName().slice(0, 15),
        email: faker.internet.email(),
        password,
        bio: faker.lorem.sentence(10),
      });
      users.push(user);
    }

    const tweets = [];
    for (let i = 0; i < 100; i++) {
      const author = faker.helpers.arrayElement(users);
      const tweet = await Tweet.create({
        author: author._id,
        content: faker.lorem.sentence(15),
        likeCount: 0,
        commentCount: 0,
      });
      //   @ts-ignore
      author.tweets.push(tweet._id);
      await author.save();
      tweets.push(tweet);

      const tagWords = faker.lorem.words(2).split(" ");
      for (const word of tagWords) {
        const tag = word.toLowerCase();
        await HashTag.findOneAndUpdate(
          { tag },
          { $addToSet: { tweetIds: tweet._id } },
          { upsert: true, new: true }
        ).exec();
      }
    }

    for (const tweet of tweets) {
      const likeUsers = faker.helpers.arrayElements(
        users,
        faker.number.int({ min: 1, max: 5 })
      );
      for (const user of likeUsers) {
        await Like.create({
          likedBy: user._id,
          tweetId: tweet._id,
        });
        tweet.likeCount++;
      }
      await tweet.save();
    }

    for (const tweet of tweets) {
      const commentUsers = faker.helpers.arrayElements(
        users,
        faker.number.int({ min: 1, max: 3 })
      );
      for (const user of commentUsers) {
        await Comment.create({
          author: user._id,
          comment: faker.lorem.sentence(),
          tweetId: tweet._id,
        });
        tweet.commentCount++;
      }
      await tweet.save();
    }

    console.log("Seeding completed!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  }
};
