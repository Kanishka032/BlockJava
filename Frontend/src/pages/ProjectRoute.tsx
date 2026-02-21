import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const student = localStorage.getItem("student");
  return student ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
