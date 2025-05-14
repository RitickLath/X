import axios from "axios";

export const likePost = async (tweetId: string) => {
  try {
    const token = localStorage.getItem("authorization") || "";

    const response = await axios.post(
      `http://localhost:3000/api/v1/like/tweet/${tweetId}`,
      {}, // empty body
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
