import ProductItem from "@/components/Product/ProductItem";
import Pagination from "@/components/shared/Pagination";

import { products } from "@/api/data";
export default function Products() {
  return (
    <div className="w-3/4 ">
      <div className="grid grid-cols-4 gap-4 mb-[30px]">
        {products.map(({ id, name, price, thumbnail }) => (
          <ProductItem
            key={id}
            id={id}
            name={name}
            price={price}
            thumbnail={thumbnail}
          />
        ))}
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}
