import mongoose, { Document, Model, Schema } from "mongoose";

interface IHashtag extends Document {
  tag: string;
  tweetIds: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const hashTagSchema: Schema<IHashtag> = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, "Hashtag is required"],
    unique: true,
    lowercase: true,
    trim: true,
    maxLength: [45, "Maxiumum Length of Hashtag is 45 character"],
  },
  tweetIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const HashTag: Model<IHashtag> = mongoose.model(
  "HashTag",
  hashTagSchema
);
