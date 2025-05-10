import { FeedRepository } from "../repository/feed.repository";

const feedRepository = new FeedRepository();

export class FeedService {
  async getLatest(userId: string, page: number) {
    console.log("Service: Step-1 - Fetching latest tweets"); // Step-1

    try {
      const tweets = await feedRepository.fetchLatest(page);
      console.log("Service: Step-2 - Repository returned latest tweets"); // Step-2

      return { success: true, data: tweets };
    } catch (error: any) {
      console.error(
        "Service: Step-Error - Failed to get latest tweets:",
        error.message
      ); // Error
      return { success: false, message: "Failed to fetch latest tweets" };
    }
  }

  async getTrending(userId: string, page: number) {
    console.log("Service: Step-1 - Fetching trending tweets"); // Step-1

    try {
      const tweets = await feedRepository.fetchTrending(page);
      console.log("Service: Step-2 - Repository returned trending tweets"); // Step-2

      return { success: true, data: tweets };
    } catch (error: any) {
      console.error(
        "Service: Step-Error - Failed to get trending tweets:",
        error.message
      ); // Error
      return { success: false, message: "Failed to fetch trending tweets" };
    }
  }

  async getFollowingTweet(userId: string, page: number) {
    console.log("Service: Step-1 - Fetching following tweets"); // Step-1

    try {
      const tweets = await feedRepository.fetchFollowingTweets(userId, page);
      console.log("Service: Step-2 - Repository returned following tweets"); // Step-2

      if (!tweets) {
        console.log("Service: Step-3 - User or following list not found"); // Step-3
        return { success: false, message: "User or following list not found" };
      }

      return { success: true, data: tweets };
    } catch (error: any) {
      console.error(
        "Service: Step-Error - Failed to get following tweets:",
        error.message
      ); // Error
      return { success: false, message: "Failed to fetch following tweets" };
    }
  }
}
