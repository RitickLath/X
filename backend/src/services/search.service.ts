import { SearchRepository } from "../repository/search.repository";

const searchRepository = new SearchRepository();

export class SearchService {
  async searchUsers(query: string) {
    // Step-1: Validating user search query
    console.log("Service: Step-1 - Validating user search query:", query); // console
    if (!query) {
      return {
        success: false,
        message: "Username query is required.",
      };
    }

    try {
      // Step-2: Fetching users from repository
      console.log(
        "Service: Step-2 - Fetching users from repository with query:",
        query
      ); // console
      const users = await searchRepository.findUsersByUsername(query);

      // Step-3: Return success response with data
      console.log("Service: Step-3 - Users fetched successfully"); // console
      return {
        success: true,
        message: "Users fetched successfully.",
        data: users,
      };
    } catch (error: any) {
      // Step-Error: Catch error and log it
      console.error("Service: Step-Error -", error.message); // console
      throw new Error("Failed to search users");
    }
  }

  async searchHashtags(query: string) {
    // Step-1: Validating hashtag search query
    console.log("Service: Step-1 - Validating hashtag search query:", query); // console
    if (!query) {
      return {
        success: false,
        message: "Hashtag query is required.",
      };
    }

    try {
      // Step-2: Fetching exact hashtags from repository
      console.log(
        "Service: Step-2 - Fetching exact hashtags from repository with query:",
        query
      ); // console
      const hashtags = await searchRepository.findExactHashtag(query);

      // Step-3: Return success response with data
      console.log("Service: Step-3 - Hashtags fetched successfully"); // console
      return {
        success: true,
        message: "Hashtags fetched successfully.",
        data: hashtags,
      };
    } catch (error: any) {
      // Step-Error: Catch error and log it
      console.error("Service: Step-Error -", error.message); // console
      throw new Error("Failed to search hashtags");
    }
  }

  async suggestHashtags(query: string) {
    // Step-1: Validating hashtag suggestion query
    console.log(
      "Service: Step-1 - Validating hashtag suggestion query:",
      query
    ); // console
    if (!query) {
      return {
        success: false,
        message: "Hashtag query is required.",
      };
    }

    try {
      // Step-2: Fetching suggestions from repository
      console.log(
        "Service: Step-2 - Fetching hashtag suggestions from repository with query:",
        query
      ); // console
      const hashtags = await searchRepository.suggestHashtags(query);

      // Step-3: Return success response with data
      console.log("Service: Step-3 - Hashtag suggestions fetched successfully"); // console
      return {
        success: true,
        message: "Hashtag suggestions fetched successfully.",
        data: hashtags,
      };
    } catch (error: any) {
      // Step-Error: Catch error and log it
      console.error("Service: Step-Error -", error.message); // console
      throw new Error("Failed to suggest hashtags");
    }
  }
}
