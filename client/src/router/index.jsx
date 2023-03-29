import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import Root from "../pages/root";
import Home from "../pages/home";
import Shop from "../pages/shop";
import About from "../pages/about";

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
