import { useEffect, useState } from "react";
import ProductItem from "@/components/product/ProductItem";
import Pagination from "@/components/shared/Pagination";

export default function Products({ products }) {
  return (
    <div className="w-3/4 ">
      <div className="grid grid-cols-4 gap-4 mb-[30px]">
        {products.map(({ _id, name, price, thumbnail, percentageDiscount }) => (
          <ProductItem
            key={_id}
            id={_id}
            name={name}
            price={price}
            thumbnail={thumbnail}
            percentageDiscount={percentageDiscount}
          />
        ))}
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}
