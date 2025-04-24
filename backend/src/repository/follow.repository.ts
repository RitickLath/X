import { User } from "../models";

export class FollowRepository {
  async findUserById(userId: string) {
    try {
      // Step-1: Find user by ID
      const user = await User.findById(userId);
      console.log("Repository: Step-1 - User fetched by ID"); //console
      return user;
    } catch (error: any) {
      console.error("Repository Error:- ", error.message); //console
      throw new Error("Failed to fetch user");
    }
  }

  async followUser(authorId: string, userId: string) {
    try {
      // Step-1: Add userId to following list of author
      const updated = await User.findByIdAndUpdate(
        authorId,
        { $addToSet: { following: userId } },
        { new: true }
      );
      console.log("Repository: Step-1 - User followed"); //console
      return updated;
    } catch (error: any) {
      console.error("Repository Error: ", error.message); //console
      throw new Error("Failed to follow user");
    }
  }

  async unfollowUser(authorId: string, userId: string) {
    try {
      // Step-1: Remove userId from following list of author
      const updated = await User.findByIdAndUpdate(
        authorId,
        { $pull: { following: userId } },
        { new: true }
      );
      console.log("Repository: Step-1 - User unfollowed"); //console
      return updated;
    } catch (error: any) {
      console.error("Repository Error: Step-3 -", error.message); //console
      throw new Error("Failed to unfollow user");
    }
  }

  async getFollowersByUserId(userId: string) {
    try {
      // Step-1: Get all users following the given userId
      const followers = await User.find({ following: userId }).select(
        "username"
      );
      console.log("Repository: Step-1 - Followers fetched"); //console
      return followers;
    } catch (error: any) {
      console.error("Repository Error:", error.message); //console
      throw new Error("Failed to get followers");
    }
  }
}
