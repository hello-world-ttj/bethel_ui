import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouterProps {
  children: ReactNode;
}

export default function PrivateRouter({ children }: PrivateRouterProps) {
  const isAuth = localStorage.getItem("423455ehlsls");
  return isAuth ? children : <Navigate to="/" />;
}
