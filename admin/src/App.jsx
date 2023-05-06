import React from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Root from "./pages/root";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./router/ProtectedRoute";

import { adminRouter, staffRouter } from "./router";
import { USER_ROLES } from "./utils/Constant";

function App() {
    const auth = useSelector((state) => state.auth);

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
                              const Element = item.element;
                              <Route path={item.path} element={<Element />} />;
                          })
                        : staffRouter.map((item) => {
                              const Element = item.element;
                              <Route path={item.path} element={<Element />} />;
                          })}
                </Route>
            </React.Fragment>,
        ),
    );
    return <RouterProvider router={router} />;
}

export default App;
