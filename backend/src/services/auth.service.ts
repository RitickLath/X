import AuthRepository from "../repository/auth.repository";
import bcrypt from "bcrypt";
import { SignUpDataSanitization } from "../utils";

const authRepository = new AuthRepository();

export default class AuthService {
  async signupService(username: string, email: string, password: string) {
    try {
      // Step 1: Validate and sanitize input using Zod
      const sanitized = SignUpDataSanitization.safeParse({
        username,
        email,
        password,
      });
      console.log("Service Layer: Step-1");

      // Step 2: If validation fails, return error response
      if (!sanitized.success) {
        return {
          success: false,
          message: "Validation failed",
          errors: sanitized.error.flatten().fieldErrors,
        };
      }
      console.log("Service Layer: Step-2");

      // Step 3: Check if the email already exists in the database
      const emailExists = await authRepository.checkForEmailUsername(
        email,
        username
      );
      if (emailExists) {
        return { success: false, message: "Email/Username already exists" };
      }
      console.log("Service Layer: Step-3");

      // Step 4: Hash the password
      const hashedPassword = await bcrypt.hash(password, 8);
      console.log("Service Layer: Step-4");

      // Step 5: Create the user record in the database
      await authRepository.signup(email, hashedPassword, username);
      console.log("Service Layer: Step-5");
      // Step 6: Return success response
      return { success: true, message: "User registered successfully" };
    } catch (error: any) {
      // Step 7: Catch and log Error
      console.error("Error in AuthService:", error.message);
      throw new Error("Service error during signup");
    }
  }
}
