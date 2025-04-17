import mongoose, { Model, Schema, Document, ValidatorProps } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  bio?: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "Username already taken"],
    maxLength: [20, "Maximum character length is 20"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    maxLength: [50, "Maximum character length is 50"],
    required: [true, "Email is required"],
    validate: {
      validator: function (v: string): boolean {
        return /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(
          v
        );
      },
      message: (props: ValidatorProps): string =>
        `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters"],
    maxLength: [16, "Password must be less than 16 characters"],
    validate: {
      validator: function (v: string): boolean {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/.test(
          v
        );
      },
      message: (): string => `Password is not strong enough`,
    },
  },
  bio: {
    type: String,
    maxLength: [160, "Bio must be under 160 characters"],
  },
});

export const User: Model<IUser> = mongoose.model("User", UserSchema);
