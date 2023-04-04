import ProductItem from "../ProductItem";
import Pagination from "../../Pagination";

import { products } from "../../../api/data";
export default function ProductList() {
    return (
        <div className="w-3/4 ">
            <div className="grid grid-cols-4 gap-4 mb-[30px]">
                {products.map(({ name, price, thumbnail }, index) => (
                    <ProductItem
                        key={index}
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
