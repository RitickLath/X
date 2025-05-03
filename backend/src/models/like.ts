import mongoose, { Document, Model, Schema } from "mongoose";

interface ILike extends Document {
  likedBy: mongoose.Types.ObjectId;
  tweetId?: mongoose.Types.ObjectId;
  commentId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const likeSchema: Schema<ILike> = new mongoose.Schema({
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tweetId: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Like: Model<ILike> = mongoose.model("Like", likeSchema);
