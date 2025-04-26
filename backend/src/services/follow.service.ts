import { CommonRepository } from "../repository/common.repository";
import { FollowRepository } from "../repository/follow.repository";

const followRepository = new FollowRepository();

export class FollowService {
  async toggleFollow(author: string, userId: string) {
    // Step-1: Validate input parameters
    console.log("Service: Step-1 - Validating input"); //console
    if (!author || !userId) {
      return {
        success: false,
        message: "UserId and Author are required.",
      };
    }

    // Step-2: Check if author exists
    console.log("Service: Step-2 - Checking if author exists"); //console
    const authorExist = await CommonRepository.findById(author, "user");
    if (!authorExist) {
      return {
        success: false,
        message: "Author doesn't exist.",
      };
    }

    // Step-3: Check if target user exists
    console.log("Service: Step-3 - Checking if target user exists"); //console
    const userExist = await CommonRepository.findById(userId, "user");
    if (!userExist) {
      return {
        success: false,
        message: "User you want to follow/unfollow doesn't exist.",
      };
    }

    // Step-4: Determine if already following

    // @ts-ignore
    const isFollowing = authorExist?.following?.includes(userId);
    let updatedAuthor;

    if (isFollowing) {
      // Step-5a: Unfollow user
      console.log("Service: Step-5a - Unfollowing user"); //console
      updatedAuthor = await followRepository.unfollowUser(author, userId);
    } else {
      // Step-5b: Follow user
      console.log("Service: Step-5b - Following user"); //console
      updatedAuthor = await followRepository.followUser(author, userId);
    }

    // Step-6: Return success response
    console.log("Service: Step-6 - Returning response"); //console
    //  @ts-ignore
    return {
      success: true,
      message: isFollowing
        ? // @ts-ignore
          `${userExist?.username} unfollowed successfully.`
        : // @ts-ignore
          `${userExist?.username} followed successfully.`,
      data: updatedAuthor?.following,
    };
  }

  async getFollowersfollowing(userId: string, type: string) {
    // Step-1: Validate input
    console.log("Service: Step-1 - Validating input for getFollowers"); //console
    if (!userId) {
      return {
        success: false,
        message: "UserId is required.",
      };
    }

    try {
      // Step-2: Fetch followers from repository
      console.log("Service: Step-2 - Fetching followers from DB"); //console
      const followers = await followRepository.getFollowerFollowingByUserId(
        userId,
        type
      );

      // Step-3: Return success
      console.log("Service: Step-3 - Returning followers"); //console
      return {
        success: true,
        message: "Followers fetched successfully.",
        data: followers,
      };
    } catch (error: any) {
      // Step-Error: Catch DB error
      console.error("Service: Step-Error -", error.message); //console
      throw new Error("Failed to fetch followers.");
    }
  }
}
