import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../../contexts/LoginContext';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useLogin();
console.log(useLogin());
  console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
