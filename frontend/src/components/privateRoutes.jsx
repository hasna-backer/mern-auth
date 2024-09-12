import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  console.log("PrivateRoute");

  const { currentUser } = useSelector((state) => state.user);
  {
    if (currentUser) {
      console.log("yeess");
    } else {
      console.log("noo");
    }
  }
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
