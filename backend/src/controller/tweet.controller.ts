import { TweetService } from "../services/tweet.service";

const tweetPostService = new TweetService();

export class TweetController {
  async tweetPostController() {
    try {
    } catch (error: any) {
      console.log("Error Occured in Tweet Controller: " + error.message);
    }
  }
}
