import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Root from "./pages/root";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import ProtectedRoute from "./router/ProtectedRoute";
import Loading from "./components/loading";
import authAPI from "./api/authAPI";
import { setUserSuccess, setUserFail } from "./features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchNotification } from "./features/auth/notificationSlice";
import { adminRouter, staffRouter } from "./router";
import { USER_ROLES } from "./utils/Constant";
import { toast } from "react-toastify";
import notificationSound from "./assets/sound/notification-sound.mp3";

import io from "socket.io-client";
const socket = io("http://localhost:8080");

function App() {
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIsLogin = async () => {
      try {
        const response = await authAPI.checkIsLogin();
        dispatch(setUserSuccess(response.data));
        unwrapResult(await dispatch(fetchNotification()));
      } catch {
        dispatch(setUserFail);
      } finally {
        setIsLoading(false);
      }
    };
    checkIsLogin();
  }, []);

  useEffect(() => {
    const handleCustomerOrder = async (data) => {
      const audio = new Audio(notificationSound);
      audio.play();
      toast.success(data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      try {
        unwrapResult(await dispatch(fetchNotification()));
      } catch (err) {
        console.log(err);
      }
    };

    socket.on("customerOrder", handleCustomerOrder);

    return () => {
      socket.off("customerOrder", handleCustomerOrder);
    };
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Root />
            </ProtectedRoute>
          }
        >
          {auth.currentUser?.role === USER_ROLES.ADMIN
            ? adminRouter.map((item) => {
                const Page = item.element;
                return <Route key={item.path} path={item.path} element={<Page />} />;
              })
            : staffRouter.map((item) => {
                const Page = item.element;
                return <Route key={item.path} path={item.path} element={<Page />} />;
              })}
        </Route>
      </React.Fragment>,
    ),
  );
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading size={40} />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </React.Fragment>
  );
}

export default App;
