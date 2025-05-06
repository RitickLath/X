import AuthRepository from "../repository/auth.repository";

import {
  SignInDataSanitization,
  SignUpDataSanitization,
  updateAuthDataSanitization,
} from "../utils";
import jwt from "jsonwebtoken";

const authRepository = new AuthRepository();

export default class AuthService {
  async signupService(username: string, email: string, password: string) {
    try {
      if (!username || !email || !password) {
        return {
          success: false,
          message: "All Fields are required",
        };
      }

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
      const user = await authRepository.findDuplicateUser(email, username);
      if (user) {
        return { success: false, message: "Email/Username already exists" };
      }
      console.log("Service Layer: Step-3");

      // Step 4: Create the user record in the database
      await authRepository.createUser(email, password, username);
      console.log("Service Layer: Step-4");

      // Step 5: Return success response
      return { success: true, message: "User registered successfully" };
    } catch (error: any) {
      // Step 6: Catch and log Error
      console.error("Error in AuthService: Sign up", error.message);
      throw new Error("Service error during signup");
    }
  }

  async signinservice(email: string, password: string) {
    try {
      if (!email || !password) {
        return {
          success: false,
          message: "Email and password both are required",
        };
      }

      // Step 1: Validate and sanitize using Zod
      const sanitized = SignInDataSanitization.safeParse({ email, password });
      console.log("Service Layer: Step-1");

      // Step 2: If validation fails, return error
      if (!sanitized.success) {
        return {
          success: false,
          message: "Validation failed",
          errors: sanitized.error.flatten().fieldErrors,
        };
      }
      console.log("Service Layer: Step-2");

      // Step 3: Check if user with provided email exists
      const user = await authRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "Wrong Credentials" };
      }
      console.log("Service Layer: Step-3");

      // Step 4: Compare the input password with hashed password from DB
      const isPasswordValid = await user.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return { success: false, message: "Wrong Credentials" };
      }
      console.log("Service Layer: Step-4");

      // Step 5: Create payload for JWT
      const payload = { id: user._id };
      console.log("Service Layer: Step-5");

      // Step 6: Sign JWT token
      const token = jwt.sign(payload, process.env.SECRETJWT as string);
      console.log("Service Layer: Step-6");

      // Step 7: Return success response
      return {
        success: true,
        message: "User logged in successfully",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error: any) {
      // Step 8: Catch and log error
      console.error("Error in AuthService - Sign In:", error.message);
      throw new Error("Service error during signin");
    }
  }

  async updateservice(
    bio: string,
    userId: string | undefined,
    username: string
  ) {
    // Step-0: Check the Fields existance
    if (!bio || !userId || !username) {
      return {
        success: false,
        message: "All Fields are Required",
      };
    }

    try {
      // Step 1: Validate and sanitize input using Zod
      const isDataSanitized = updateAuthDataSanitization.safeParse({
        username,
        bio,
      });
      console.log("Service Layer: Step-1 - Data sanitization attempted");

      // Step 2: If validation fails, return early
      if (!isDataSanitized.success) {
        console.log("Service Layer: Step-2 - Validation failed");
        return {
          success: false,
          message: "Validation failed",
          errors: isDataSanitized.error.flatten().fieldErrors,
        };
      }
      console.log("Service Layer: Step-2 - Data validation passed");

      // Step 3: Call repository method to handle username check + update
      const updateResult = await authRepository.updateProfile(
        userId,
        bio,
        username
      );
      console.log("Service Layer: Step-3 - Repository method called");

      // Step 4: Check for username conflict
      if (!updateResult.success) {
        console.log("Service Layer: Step-4 - Username conflict detected");
        return {
          success: false,
          message: updateResult.message || "Update failed",
        };
      }

      // Step 5: Return updated user data
      console.log("Service Layer: Step-5 - Profile updated successfully");
      return {
        success: true,
        message: "Profile updated successfully",
        user: updateResult.data,
      };
    } catch (error: any) {
      // Step 6: Catch errors
      console.error(
        "Service Layer: Step-6 - Error during profile update",
        error.message
      );
      throw new Error("Service: Profile update failed");
    }
  }
}
