import mongoose, { Document, Model, Schema } from "mongoose";

interface IComment extends Document {
  author: mongoose.Types.ObjectId;
  comment: string;
  likeId?: mongoose.Types.ObjectId;
  tweetId?: mongoose.Types.ObjectId;
  createdAt: Date;
  commentId?: mongoose.Types.ObjectId;
  likeCount: number;
  commentCount: number;
}

// note we are not connecting the hashtag implementation on comment section (v2 maybe)

const commentSchema: Schema<IComment> = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  tweetId: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
  },
  // for comment inside comment track
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Comment: Model<IComment> = mongoose.model(
  "Comment",
  commentSchema
);
