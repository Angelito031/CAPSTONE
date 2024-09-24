import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import React from 'react';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, isAuth } = useAuthStore();
  const location = useLocation();

  if (!user || !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    // User is authenticated but doesn't have any of the required roles
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
