import ProductItem from "@/components/product/ProductItem";
import Pagination from "@/components/shared/Pagination";

import { products } from "@/api/data";
export default function Products() {
  return (
    <div className="w-3/4 ">
      <div className="grid grid-cols-4 gap-4 mb-[30px]">
        {products.map(({ id, name, price, thumbnail, percentageDiscount }) => (
          <ProductItem
            key={id}
            id={id}
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
