import mongoose, { Model, Schema, Document, ValidatorProps } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  bio?: string;
  following?: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
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
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const User: Model<IUser> = mongoose.model("User", userSchema);
