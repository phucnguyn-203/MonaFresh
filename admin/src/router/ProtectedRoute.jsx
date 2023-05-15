import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { USER_ROLES } from "../utils/Constant";
export default function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      {auth.isAuth && (auth.currentUser.role === USER_ROLES.ADMIN || auth.currentUser.role === USER_ROLES.STAFF) ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </React.Fragment>
  );
}
