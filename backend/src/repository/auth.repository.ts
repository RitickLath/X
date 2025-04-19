import { User } from "../models";

export default class AuthRepository {
  //Create a new user
  async signup(
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
}
