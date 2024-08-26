import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import React from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuth} = useAuthStore();
  const location = useLocation();

  if (!user || !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
