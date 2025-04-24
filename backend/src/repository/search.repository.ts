import { User, HashTag } from "../models";

export class SearchRepository {
  async findUsersByUsername(query: string) {
    try {
      // Step-1: Searching for users based on username query
      console.log("Repository: Step-1 - Searching users with query:", query); // console
      const users = await User.find({
        username: { $regex: `^${query}`, $options: "i" },
      }).select("username");

      // Step-2: Return users
      console.log("Repository: Step-2 - Users fetched from DB successfully"); // console
      return users;
    } catch (error: any) {
      // Step-Error: Catch any errors during database operations
      console.error("Repository: Step-Error -", error.message); // console
      throw new Error("Failed to fetch users");
    }
  }

  async findExactHashtag(query: string) {
    try {
      // Step-1: Searching for exact match of hashtag
      console.log("Repository: Step-1 - Searching for exact hashtag:", query); // console
      const hashtags = await HashTag.find({
        tag: `#${query}`,
      }).select("tag");

      // Step-2: Return hashtags
      console.log(
        "Repository: Step-2 - Exact hashtag fetched from DB successfully"
      ); // console
      return hashtags;
    } catch (error: any) {
      // Step-Error: Catch any errors during database operations
      console.error("Repository: Step-Error -", error.message); // console
      throw new Error("Failed to fetch hashtags");
    }
  }

  async suggestHashtags(query: string) {
    try {
      // Step-1: Searching for hashtag suggestions based on query
      console.log(
        "Repository: Step-1 - Searching for hashtag suggestions:",
        query
      ); // console
      const hashtags = await HashTag.find({
        tag: { $regex: `^#${query}`, $options: "i" },
      }).select("tag");

      // Step-2: Return suggested hashtags
      console.log(
        "Repository: Step-2 - Suggested hashtags fetched from DB successfully"
      ); // console
      return hashtags;
    } catch (error: any) {
      // Step-Error: Catch any errors during database operations
      console.error("Repository: Step-Error -", error.message); // console
      throw new Error("Failed to fetch hashtag suggestions");
    }
  }
}
