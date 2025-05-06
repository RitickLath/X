import mongoose, { Model, Schema, Document, ValidatorProps } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  bio?: string;
  following?: mongoose.Types.ObjectId[];
  tweets?: mongoose.Types.ObjectId[];
  isPasswordCorrect: (password: string) => Promise<boolean>;
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
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User: Model<IUser> = mongoose.model("User", userSchema);
