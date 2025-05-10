import axios from "axios";

export const getTweets = async (type: string, page: number) => {
  const token = localStorage.getItem("authorization");

  const response = await axios.get(
    `http://localhost:3000/api/v1/${type}?page=${page}`,
    {
      headers: { Authorization: token },
    }
  );
  return response;
};
