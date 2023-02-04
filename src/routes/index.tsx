import { ComponentType, useContext } from "react";
import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";

interface RoutesProps {}

export const RoutesApp = ({}: RoutesProps) => {
  const { accessToken } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={accessToken ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={accessToken ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
