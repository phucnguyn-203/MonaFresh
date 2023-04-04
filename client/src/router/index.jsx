import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Root from "../pages/Root";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>
            <Route path="/" element={<Root />}>
                <Route path="" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
            </Route>
        </React.Fragment>
    )
);

export default router;
