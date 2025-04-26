export class UserService {
  // Get Profile Service
  async getProfile(userId: String, author: String) {
    try {
    } catch (error: any) {
      // Step-Error: Catch service error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during Get Profile");
    }
  }
  // Follow/Unfollow User Service
  async followUnfollowUser() {
    try {
    } catch (error: any) {
      // Step-Error: Catch service error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during Follow/Unfollow User");
    }
  }
  // Get followers Service
  async getFollowers() {
    try {
    } catch (error: any) {
      // Step-Error: Catch service error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during Get Followers");
    }
  }
  // Get Following Service
  async getFollowing() {
    try {
    } catch (error: any) {
      // Step-Error: Catch service error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during Get Following");
    }
  }
  // get Follow/Following Count
  async getFollowFollowingCount() {
    try {
    } catch (error: any) {
      // Step-Error: Catch service error
      console.error("Service: Step-Error -", error.message);
      throw new Error("Service error during Get Follows, Following Count");
    }
  }
}
