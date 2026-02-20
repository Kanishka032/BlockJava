import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const student = JSON.parse(localStorage.getItem("student") || "null");

  if (!student) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;