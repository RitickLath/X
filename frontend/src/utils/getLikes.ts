// useless why will i need to get who liked it

import axios from "axios";

export const getLikes = async (tweetId: string, page: number) => {
  const token = localStorage.getItem("authorization");

  const response = await axios.get(
    `http://localhost:3000/api/v1/like/liked-users`,

    {
      headers: { Authorization: token },
      params: {
        id: tweetId,
        type: "tweet",
      },
    }
  );
  return response;
};
