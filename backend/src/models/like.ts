import mongoose, { Document, Model, Schema } from "mongoose";

interface ILike extends Document {
  userId: mongoose.Types.ObjectId;
  tweetId?: mongoose.Types.ObjectId;
  commentId?: mongoose.Types.ObjectId;
}

const likeSchema: Schema<ILike> = new mongoose.Schema({
  userId: {
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
});

export const Like: Model<ILike> = mongoose.model("Like", likeSchema);
