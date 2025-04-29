import { Navigate, Outlet } from "react-router-dom";

const HomeRedirected = () => {
  const isAuthenticated = localStorage.getItem("token"); // will add central place to authenticate
  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default HomeRedirected;
