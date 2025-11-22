import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && user.type !== requiredRole) {
    // Redirect to appropriate home page based on user type
    const redirectPath = user.type === 'admin' ? '/admin/employees' : '/jobs';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
