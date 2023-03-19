import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Root from "../pages/root";
import Login from "../pages/login/login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Root />}></Route>
        </React.Fragment>
    )
);

export default router;
