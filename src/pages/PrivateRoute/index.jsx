// PrivateRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const PrivateRoute = ({
  children,
  isAuthenticated,
  loading,
  allowedRoles,
  userRole,
}) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the correct role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/access-denied" replace />; // You can create an AccessDenied page
  }

  return children;
};

export default PrivateRoute;
