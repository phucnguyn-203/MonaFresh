import React from "react";
import { Banner, TopCategories, TopProducts, Promotion, NewProducts, DiscountProducts } from "@/components/home";

export default function Home() {
    return (
        <React.Fragment>
            <Banner />
            <div className="container">
                <TopCategories />
                <Promotion />
                <TopProducts />
                <NewProducts />
                <DiscountProducts />
            </div>
        </React.Fragment>
    );
}
