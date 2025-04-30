import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FC } from "react";

const ProtectedRoute: FC = () => {
  // const isAuthenticated = localStorage.getItem("token"); // will add central place to authenticate
  return (
    <div className="bg-black flex">
      <Sidebar />
      <div className="p-8 text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;

// const ProtectedRoute = () => {
//   const isAuthenticated = localStorage.getItem("token"); // will add central place to authenticate
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };
