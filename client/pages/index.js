import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  Banner,
  TopCategories,
  TopProducts,
  Promotion,
  NewProducts,
  DiscountProducts,
  Certificates,
  CustomerPolicy,
} from "@/components/home";

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <React.Fragment>
      <Banner />
      <div className="container">
        <TopCategories />
        <Promotion />
        <TopProducts />
        <NewProducts />
        <DiscountProducts />
        <CustomerPolicy />
      </div>
      <Certificates />
    </React.Fragment>
  );
}
