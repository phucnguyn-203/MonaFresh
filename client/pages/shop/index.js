import { useState, useEffect } from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Sidebar from "@/components/shop/Sidebar";
import Products from "@/components/shop/Products";
import productAPI from "@/api/productAPI";

export default function Shop() {
  const breadcrumb = [
    {
      title: "trang chủ",
      path: "/",
    },
    {
      title: "cửa hàng",
      path: "/shop",
    },
  ];
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [filterByCategory, setFilterByCategory] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [rangePriceFilter, setRangePriceFilter] = useState([0, 0]);

  useEffect(() => {
    getAllProduct();
  }, [filterByCategory, sortValue, rangePriceFilter, currentPage]);

  const getAllProduct = async () => {
    let params = {
      page: currentPage,
      limit: 12,
    };
    if (filterByCategory) {
      params.category = filterByCategory;
    }
    if (sortValue) {
      params = { ...params, ...sortValue };
    }
    if (rangePriceFilter[0] !== 0 || rangePriceFilter[1] !== 0) {
      params = {
        ...params,
        "price[gte]": rangePriceFilter[0],
        "price[lte]": rangePriceFilter[1],
      };
    }
    try {
      const response = await productAPI.getAllProduct(params);
      setProducts(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="pt-8 flex items-center justify-between">
        <div className="text-xl text-black">
          <Breadcrumb breadcrumb={breadcrumb} />
        </div>
        <div className="flex items-center">
          <p className="mr-[20px] text-base">Hiển thị một kết quả duy nhất</p>
          <select
            defaultValue={sortValue.value}
            onChange={(e) => {
              if (e.target.value) {
                setSortValue(JSON.parse(e.target.value));
              } else {
                setSortValue("");
              }
            }}
            className="relative flex gap-x-2 items-center text-black px-5 py-2 border-[1px] border-solid border-gray-400 bg-gray-50 rounded-full"
          >
            <option value="">Thứ tự mặc định</option>
            <option value={JSON.stringify({ sort: "-createdAt" })}>
              Mới nhất
            </option>
            <option value={JSON.stringify({ sort: "price" })}>
              Thứ tự giá từ thấp đến cao
            </option>
            <option value={JSON.stringify({ sort: "-price" })}>
              Thứ tự giá từ cao đến thấp
            </option>
          </select>
        </div>
      </div>
      <div className="flex mt-[40px] gap-x-6  ">
        <Sidebar
          filterByCategory={filterByCategory}
          setFilterByCategory={setFilterByCategory}
          rangePriceFilter={rangePriceFilter}
          setRangePriceFilter={setRangePriceFilter}
        />
        {products.length > 0 ? (
          <Products
            products={products}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
          />
        ) : (
          <p className="italic text-xl flex-1 text-center">
            Không tìm thấy sản phẩm
          </p>
        )}
      </div>
    </div>
  );
}
