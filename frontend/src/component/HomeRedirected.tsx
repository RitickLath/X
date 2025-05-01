import { FC } from "react";
import { Outlet } from "react-router-dom";

// till we make the implementation
const HomeRedirected: FC = () => {
  // const isAuthenticated = localStorage.getItem("token"); // will add central place to authenticate
  return (
    <div className="bg-black w-full min-h-screen text-white">
      <Outlet />
    </div>
  );
};

export default HomeRedirected;

// const HomeRedirected = () => {
//   const isAuthenticated = localStorage.getItem("token"); // will add central place to authenticate
//   return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
// };
