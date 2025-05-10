import { Tweet, User } from "../models";

export class FeedRepository {
  async fetchLatest(page: number) {
    console.log("Repository: Step-1 - Fetching latest tweets from DB");

    try {
      const tweets = await Tweet.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .skip(page * 10)
        .populate("author", "username");

      console.log("Repository: Step-2 - Latest tweets fetched successfully");
      return tweets;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Failed to fetch latest tweets:",
        error.message
      );
      throw new Error("Database error while fetching latest tweets");
    }
  }

  async fetchTrending(page: number) {
    console.log("Repository: Step-1 - Aggregating trending tweets");

    try {
      const tweets = await Tweet.aggregate([
        {
          $addFields: {
            weightedEngagement: {
              $add: [
                { $multiply: ["$likeCount", 1] },
                { $multiply: ["$retweetCount", 2] },
                { $multiply: ["$commentCount", 1.5] },
              ],
            },
          },
        },
        { $sort: { weightedEngagement: -1, createdAt: -1 } },
        { $skip: page * 10 },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            content: 1,
            image: 1,
            createdAt: 1,
            likeCount: 1,
            retweetCount: 1,
            commentCount: 1,
            weightedEngagement: 1,
            "author.username": 1,
          },
        },
      ]);

      console.log(
        "Repository: Step-2 - Trending tweets aggregated successfully"
      );
      return tweets;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Failed to fetch trending tweets:",
        error.message
      );
      throw new Error("Database error while fetching trending tweets");
    }
  }

  async fetchFollowingTweets(userId: string, page: number) {
    console.log("Repository: Step-1 - Fetching user's following list");

    try {
      const user = await User.findById(userId).select("following");

      if (!user || !user.following) {
        console.log("Repository: Step-2 - User or following list not found");
        return null;
      }

      console.log("Repository: Step-3 - Fetching tweets from following users");

      const tweets = await Tweet.find({ author: { $in: user.following } })
        .sort({ createdAt: -1 })
        .limit(10)
        .skip(page * 10)
        .populate("author", "username");

      console.log("Repository: Step-4 - Following tweets fetched successfully");
      return tweets;
    } catch (error: any) {
      console.error(
        "Repository: Step-Error - Failed to fetch following tweets:",
        error.message
      );
      throw new Error("Database error while fetching following tweets");
    }
  }
}
