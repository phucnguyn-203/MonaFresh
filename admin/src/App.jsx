import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Root from "./pages/root";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import ProtectedRoute from "./router/ProtectedRoute";
import Loading from "./components/loading";
import authAPI from "./api/authAPI";
import { setUserSuccess, setUserFail } from "./features/auth/authSlice";
import { adminRouter, staffRouter } from "./router";
import { USER_ROLES } from "./utils/Constant";

function App() {
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIsLogin = async () => {
      try {
        const response = await authAPI.checkIsLogin();
        dispatch(setUserSuccess(response.data));
      } catch {
        dispatch(setUserFail);
      } finally {
        setIsLoading(false);
      }
    };
    checkIsLogin();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
          <Loading size={64} />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </React.Fragment>
  );
}

export default App;
