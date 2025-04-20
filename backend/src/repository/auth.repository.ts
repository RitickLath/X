import { User } from "../models";

export default class AuthRepository {
  //Create a new user
  async createUser(
    email: string,
    hashedPassword: string,
    username: string
  ): Promise<boolean> {
    try {
      const data = await User.create({
        email,
        password: hashedPassword,
        username,
      });
      if (data) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.error("Repository Error (signup):", error.message);
      throw new Error("Repository: Failed to create user");
    }
  }

  //Check if email already exists
  async findDuplicateUser(email: string, username: string) {
    try {
      const user = await User.findOne({ $or: [{ email }, { username }] });
      return user; // returns user
    } catch (error: any) {
      console.error("Repository Error (Check Email)", error.message);
      throw new Error("Repository: Failed to check for email");
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user; // returns user
    } catch (error: any) {
      console.error("Repository Error (Check Email)", error.message);
      throw new Error("Repository: Failed to check for email");
    }
  }

  async updateProfile(userId: string, bio: string, username: string) {
    try {
      // Step 1: Check if the username is taken by someone else
      const duplicateUser = await User.findOne({
        username,
        _id: { $ne: userId },
      });
      if (duplicateUser) {
        return { success: false, message: "Username already taken" };
      }

      // Step 2: Update the user's profile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, bio },
        { new: true }
      );

      return { success: true, data: updatedUser };
    } catch (error: any) {
      console.error("Repository Error: updateProfile", error.message);
      throw new Error("Repository: Failed to update user profile");
    }
  }
}
