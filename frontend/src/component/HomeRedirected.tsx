/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const HomeRedirected: FC = () => {
  const token = localStorage.getItem("authorization");
  const navigate = useNavigate();
  const [status, setStatus] = useState<null | boolean>(null);

  useEffect(() => {
    const validate = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/token",
          {
            headers: { authorization: token },
          }
        );
        setStatus(response.data.status);
      } catch (error) {
        setStatus(false);
      }
    };

    validate(); 
  }, [token]);

  useEffect(() => {
    if (status === true) {
      navigate("/home");
    }
  }, [status, navigate]);

  return (
    <div className="bg-black w-full min-h-screen text-white">
      <Outlet />
    </div>
  );
};

export default HomeRedirected;
