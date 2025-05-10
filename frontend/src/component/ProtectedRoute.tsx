/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FC, useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute: FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authorization");
  const [validate, setValidate] = useState<null | boolean>(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/token",
          {
            headers: { authorization: token },
          }
        );
        setValidate(response.data.status);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setValidate(false);
      }
    };

    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (validate === null) {
    return <div className="text-white p-4">Checking authentication...</div>;
  }

  if (!validate) {
    navigate("/login");
    return null;
  }

  return (
    <div className="bg-black flex">
      <div className="sticky top-0">
        <Sidebar />
      </div>
      <div className="text-white w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;
