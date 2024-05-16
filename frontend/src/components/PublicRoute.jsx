// PublicRoute.js
import React from "react";
import { Navigate, Route } from "react-router-dom";

const PublicRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <Route {...rest} element={<Element />} />
  );
};

export default PublicRoute;
