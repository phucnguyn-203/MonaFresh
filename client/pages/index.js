import React from "react";
import {
    Banner,
    TopCategories,
    TopProducts,
    Promotion,
    NewProducts,
    DiscountProducts,
    Certificateds,
    CustomerPolicy,
} from "@/components/home";

export default function Home() {
    return (
        <React.Fragment>
            <Banner />
            <div className="container">
                <TopCategories />
                <Promotion />
                <CustomerPolicy />
                <TopProducts />
                <NewProducts />
                <DiscountProducts />
            </div>
            <Certificateds />
        </React.Fragment>
    );
}
