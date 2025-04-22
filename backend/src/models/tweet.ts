import mongoose, { Document, Model, Schema } from "mongoose";

interface ITweet extends Document {
  author?: mongoose.Types.ObjectId;
  content: string;
  image?: string;
  retweet?: mongoose.Types.ObjectId;
  original?: boolean;
}

const tweetSchema: Schema<ITweet> = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    validate: {
      validator: function (this: ITweet) {
        // Require author only if original is true (or undefined)
        return this.original !== false ? !!this.author : true;
      },
      message: "Author is required for original tweets.",
    },
  },
  content: {
    type: String,
    maxLength: [270, "Maximum Allowed Characters is 270"],
    //required: [true, "Tweet content is required"],
  },
  image: {
    type: String,
  },
  retweet: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
  },
  original: {
    type: Boolean,
    default: true,
  },
});

export const Tweet: Model<ITweet> = mongoose.model("Tweet", tweetSchema);
