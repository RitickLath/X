import mongoose, { Document, Model, Schema } from "mongoose";

interface IComment extends Document {
  author: mongoose.Types.ObjectId;
  comment: string;
  likeId?: mongoose.Types.ObjectId;
  tweetId: mongoose.Types.ObjectId;
  commentId?: mongoose.Types.ObjectId;
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
    required: true,
  },
  // for comment inside comment track
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

export const Comment: Model<IComment> = mongoose.model(
  "Comment",
  commentSchema
);
