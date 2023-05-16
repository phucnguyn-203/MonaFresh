import React from "react";
import ResultItem from "../ResultItem";

export default function SearchResult({
  products = [],
  isSearching,
  handleClickResultItem,
}) {
  return (
    <div className="absolute z-10000 top-[100%] left-0 right-0 border rounded-lg shadow divide-y overflow-y-auto bg-white mt-1">
      {isSearching ? (
        <p className="italic p-3 text-black text-center">Đang tìm kiếm...</p>
      ) : (
        <React.Fragment>
          {products.length ? (
            products.map(({ _id, name, price, thumbnail }) => (
              <ResultItem
                key={_id}
                id={_id}
                thumbnail={thumbnail}
                name={name}
                price={price}
                handleClickResultItem={handleClickResultItem}
              />
            ))
          ) : (
            <div className="italic p-3 text-black text-center">
              Không tìm thấy kết quả
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
