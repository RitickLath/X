import axios from "axios";

export const getProfile = async (userId) => {
  const token = localStorage.getItem("authorization");

  const response = await axios.get(
    `http://localhost:3000/api/v1/profile/${userId}`,

    {
      headers: { Authorization: token },
    }
  );
  return response;
};
