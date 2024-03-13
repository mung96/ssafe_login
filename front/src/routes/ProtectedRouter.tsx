import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRouter = () => {
  const accessToken = localStorage.getItem("access_token");
  const currentLocation = useLocation();

  return (
    <>
      {accessToken ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ redirectFrom: currentLocation }} />
      )}
    </>
  );
};

export default ProtectedRouter;
