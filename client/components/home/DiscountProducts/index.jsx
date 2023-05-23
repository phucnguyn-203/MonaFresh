import Link from "next/link";
import ProductsCarousel from "@/components/product/ProductsCarousel";
import React, { useState, useEffect } from "react";
import productAPI from "@/api/productAPI";


export default function DiscountProducts() {
  const [products, setProducts] = useState();

  useEffect(() => {
    getAllProduct();
  },[]);

  const getAllProduct = async() => {
    let params = {
      sort: "-percentageDiscount",
      isActive: true,
    };
    try {
      const response = await productAPI.getAllProduct(params);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-20 bg-white p-7 rounded-xl" data-aos="fade-up">
      <h1 className="text-[#1C1C1C] text-center text-3xl font-bold mb-12">
        Sản phẩm giảm giá
      </h1>
      <div className="mb-10">
        <ProductsCarousel products={products} />
      </div>
      <div className="text-center text-white text-sm">
        <Link
          href={{ pathname: '/shop', query: {sort: "-percentageDiscount"} }}
          className="bg-primary px-8 py-3 rounded-lg hover:bg-lime-600 transition-all inline-block"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
}
