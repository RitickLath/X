import axios from "axios";
import { SignUpDataSanitization } from "./zodSchema";

interface SignupResult {
  status: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const signuphandler = async (
  username: string,
  email: string,
  password: string
): Promise<SignupResult> => {
  const sanitized = SignUpDataSanitization.safeParse({
    username,
    email,
    password,
  });

  if (!sanitized.success) {
    return {
      status: false,
      message: sanitized.error.errors[0].message || "Invalid Inputs",
    };
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      { username, email, password }
    );

    return {
      status: true,
      message: response.data?.message || "Signup successful",
      data: response.data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      status: false,
      message:
        err.response?.data?.message || "Something went wrong during signup",
    };
  }
};
