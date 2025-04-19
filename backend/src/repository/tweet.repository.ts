export class TweetRepository {
  async createTweet() {
    try {
    } catch (error: any) {
      console.log("Error Occured in Tweet Repository: " + error.message);
      throw new Error("Error Occured in Tweet Repository: " + error.message);
    }
  }
}
