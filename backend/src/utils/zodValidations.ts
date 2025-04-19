import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

export const SignUpDataSanitization = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(16, { message: "Password must not exceed 16 characters." })
    .regex(passwordRegex, {
      message:
        "Password must include at least one uppercase, one lowercase, and one special character.",
    }),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username cannot exceed 20 characters." }),
});

export const SignInDataSanitization = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string(),
});
