import Link from "next/link";
import ProductsCarousel from "@/components/product/ProductsCarousel";
import ProductItem from "@/components/product/ProductItem";

import { products } from "@/api/data";
export default function NewProducts() {
  return (
    <div className="mt-20 bg-white p-7 rounded-xl" data-aos="fade-up">
      <h1 className="text-[#1C1C1C] text-center text-3xl font-bold mb-12">
        Sản phẩm mới nhất
      </h1>
      <div className="mb-10">
        <ProductsCarousel products={products} />
      </div>
      <div className="text-center text-white text-sm">
        <Link
          href="/shop"
          className="bg-primary px-8 py-3 rounded-lg hover:bg-lime-600 transition-all inline-block"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
}
