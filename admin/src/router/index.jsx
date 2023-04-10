import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";



import Root from "../pages/root";
import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard";
import Product from "../pages/product";
import Category from "../pages/category";
import Customer from "../pages/customer";
import Order from "../pages/order";
import Staff from "../pages/staff";
import Setting from "../pages/setting";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>
          
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Root />}>
                <Route path="" element={<Dashboard />} />
                <Route path="/products" element={<Product />} />
                <Route path="/category" element={<Category />} />
                <Route path="/customers" element={<Customer />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/staffs" element={<Staff />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </React.Fragment>
    )
);

export default router;
