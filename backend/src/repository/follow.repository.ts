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

  async getFollowerFollowingByUserId(userId: string, type: string) {
    try {
      // Step-1: Get all users following/follower the given userId
      let response;
      if (type == "followers") {
        response = await User.find({ following: { $in: [userId] } }).select(
          "username"
        );
      } else if (type == "followings") {
        response = await User.findOne({ _id: userId })
          .populate("following", "username")
          .select("following");
        if (!response) {
          throw new Error("User not found");
        }
      } else {
        throw new Error(`Failed to get ${type}`);
      }

      console.log("Repository: Step-1 - Followers fetched"); //console
      return response;
    } catch (error: any) {
      console.error("Repository Error:", error.message); //console
      throw new Error("Failed to get followers");
    }
  }
}
