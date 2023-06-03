import { useEffect, useState } from "react";
import ProductItem from "@/components/product/ProductItem";
import Pagination from "@/components/shared/Pagination";

export default function Products({
  products,
  currentPage,
  setCurrentPage,
  totalPageCount,
}) {
  return (
    <div className="w-3/4 ">
      <div className="grid grid-cols-4 gap-4 mb-[30px]">
        {products.map(
          ({ _id, name, price, thumbnail, percentageDiscount, quantity }) => (
            <ProductItem
              key={_id}
              id={_id}
              name={name}
              price={price}
              thumbnail={thumbnail}
              quantity={quantity}
              percentageDiscount={percentageDiscount}
            />
          ),
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPageCount={totalPageCount}
      />
    </div>
  );
}
