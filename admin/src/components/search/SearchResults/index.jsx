import React from "react";
import ResultItem from "../ResultItem";
import { Link } from "react-router-dom";

export default function SearchResult({
  searchProductsResult = [],
  isSearching,
  products,
  setProducts,
  closeSearchResult,
}) {
  return (
    <div className="absolute z-10000 top-[27%] left-[45px] right-[50%] h-[300px] border rounded-lg shadow-md divide-y overflow-y-auto bg-white mt-1">
      {isSearching ? (
        <p className="italic p-3 text-black text-center">Đang tìm kiếm...</p>
      ) : (
        <React.Fragment>
          {searchProductsResult.length ? (
            searchProductsResult.map(({ _id, name, importPrice, thumbnail, quantity }) => (
              <ResultItem
                key={_id}
                id={_id}
                thumbnail={thumbnail}
                name={name}
                importPrice={importPrice}
                quantity={quantity}
                products={products}
                setProducts={setProducts}
                closeSearchResult={closeSearchResult}
              />
            ))
          ) : (
            <div className="italic p-3 text-black text-center">
              Không tìm thấy kết quả. Đến trang
              <Link className="font-medium text-green-500" to={"/products"}>
                {" "}
                sản phẩm{" "}
              </Link>
              để thêm.
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
