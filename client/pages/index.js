import React from "react";
import { Banner, TopCategories } from "@/components/home";
export default function Home() {
    return (
        <React.Fragment>
            <Banner />
            <div className="container">
                <TopCategories />
            </div>
        </React.Fragment>
    );
}
