import axios from "axios";
import { SignInDataSanitization } from "./zodSchema";

interface SigninResult {
  status: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const signinhandler = async (
  email: string,
  password: string
): Promise<SigninResult> => {
  const sanitized = SignInDataSanitization.safeParse({ email, password });

  if (!sanitized.success) {
    return {
      status: false,
      message: sanitized.error.errors[0].message || "Invalid Inputs",
    };
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signin",
      { email, password }
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
