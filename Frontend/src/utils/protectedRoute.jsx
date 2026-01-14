import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = () => {
  const [authUser] = useAuth();

  return authUser ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;