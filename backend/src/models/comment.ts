import mongoose, { Document, Model, Schema } from "mongoose";

interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  comment: string;
  likeId?: mongoose.Types.ObjectId;
  tweetId?: mongoose.Types.ObjectId;
  commentId?: mongoose.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  likeId: {
    type: Schema.Types.ObjectId,
    ref: "Like",
  },
});

export const Comment: Model<IComment> = mongoose.model(
  "Comment",
  commentSchema
);
