import AuthRepository from "../repository/auth.repository";
import bcrypt from "bcrypt";
import { SignInDataSanitization, SignUpDataSanitization } from "../utils";
import jwt from "jsonwebtoken";

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
      const user = await authRepository.findDuplicateUser(email, username);
      if (user) {
        return { success: false, message: "Email/Username already exists" };
      }
      console.log("Service Layer: Step-3");

      // Step 4: Hash the password
      const hashedPassword = await bcrypt.hash(password, 8);
      console.log("Service Layer: Step-4");

      // Step 5: Create the user record in the database
      await authRepository.createUser(email, hashedPassword, username);
      console.log("Service Layer: Step-5");

      // Step 6: Return success response
      return { success: true, message: "User registered successfully" };
    } catch (error: any) {
      // Step 7: Catch and log Error
      console.error("Error in AuthService: Sign up", error.message);
      throw new Error("Service error during signup");
    }
  }

  async signinservice(email: string, password: string) {
    try {
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
      const isPasswordValid = await bcrypt.compare(password, user.password);
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
}
