import { TweetRepository } from "../repository/tweet.repository";

const tweetRepository = new TweetRepository();

export class TweetService {
  async tweetPostService() {
    try {
    } catch (error: any) {
      console.log("Error Occured in Tweet Service: " + error.message);
      throw new Error("Error Occured in Tweet Service: " + error.message);
    }
  }
}
