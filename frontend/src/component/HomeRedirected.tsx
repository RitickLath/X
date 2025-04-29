import { Outlet } from "react-router-dom";

// till we make the implementation
const HomeRedirected = () => {
  // const isAuthenticated = localStorage.getItem("token"); // will add central place to authenticate
  return <Outlet />;
};

export default HomeRedirected;

// const HomeRedirected = () => {
//   const isAuthenticated = localStorage.getItem("token"); // will add central place to authenticate
//   return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
// };
