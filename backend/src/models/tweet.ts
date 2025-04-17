import mongoose, { Document, Model, Schema } from "mongoose";

interface ITweet extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  image?: string;
  likes?: mongoose.Types.ObjectId[];
  comments?: mongoose.Types.ObjectId[];
  hashtag?: mongoose.Types.ObjectId[];
}

const tweetSchema: Schema<ITweet> = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author Id is Must"],
  },
  content: {
    type: String,
    maxLength: [270, "Maximum Allowed Characters is 270"],
    required: [true, "Tweet content  is Required"],
  },
  hashtag: [
    {
      type: Schema.Types.ObjectId,
      ref: "HashTag",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  image: {
    type: String,
  },
});

export const Tweet: Model<ITweet> = mongoose.model("Tweet", tweetSchema);