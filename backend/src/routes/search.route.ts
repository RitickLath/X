import express from "express";
import { HashTag, User } from "../models";

export const searchRouter = express.Router();

// search by username (?q=ritick)
searchRouter.get("/users", async (req, res) => {
  const username = req.query.q;
  //   const userId = req.id;
  if (!username) {
    res.status(400).json({
      success: false,
      message:
        "User ID user must login and Provide the username to search for.",
    });
    return;
  }
  // Finds any records where the name starts with 'username' value
  const users = await User.find({
    username: { $regex: `^${username}`, $options: "i" },
  }).select("username");
  console.log(users);
  res.status(200).json({
    success: true,
    message: "Usernames fetched Successfully.",
    data: users,
  });
});

// search by hashtags (?q=dev)
searchRouter.get("/hashtags", async (req, res) => {
  const hashtag = req.query.q;
  //   const userId = req.id;
  if (!hashtag) {
    res.status(400).json({
      success: false,
      message: "User ID user must login and Provide the hashtag to search for.",
    });
    return;
  }
  // Finds any records where the name starts with 'username' value
  const hashtags = await HashTag.find({
    tag: `#${hashtag}`,
  }).select("tag");
  console.log(hashtags);
  res.status(200).json({
    success: true,
    message: "hashtags fetched Successfully.",
    data: hashtags,
  });
});

// get hashtag suggestions (?q=nodejs)
searchRouter.get("/suggestions", async (req, res) => {
  const hashtag = req.query.q;
  //   const userId = req.id;
  if (!hashtag) {
    res.status(400).json({
      success: false,
      message: "User ID user must login and Provide the hashtag to search for.",
    });
    return;
  }
  // Finds any records where the name starts with 'username' value
  const hashtags = await HashTag.find({
    tag: { $regex: `^#${hashtag}`, $options: "i" },
  }).select("tag");
  console.log(hashtags);
  res.status(200).json({
    success: true,
    message: "hashtags fetched Successfully.",
    data: hashtags,
  });
});
