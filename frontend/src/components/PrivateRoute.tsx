import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { authenticated } = useAuth();

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
