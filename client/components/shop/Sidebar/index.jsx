import { useState, useEffect } from "react";
import Slider from "rc-slider";
import categoryAPI from "@/api/categoryAPI";
import formatCurrency from "@/utils/formatCurrency";
import styles from "./styles.module.css";
import "rc-slider/assets/index.css";

export default function Sidebar({
  filterByCategory,
  setFilterByCategory,
  rangePriceFilter,
  setRangePriceFilter,
}) {
  const [cost, setCost] = useState([0, 1000000]);
  const [categories, setCategories] = useState([]);
  const [allProductsFilter, setAllProductsFilter] = useState(true);

  const getAllCategory = async () => {
    try {
      const response = await categoryAPI.getAllCategory({ isActive: true });
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAllProductsClick = () => {
    setFilterByCategory("");
    setAllProductsFilter(true);
  };

  useEffect(() => {
    if(filterByCategory){
      setAllProductsFilter(false);
    };
    getAllCategory();
  }, []);

  return (
    <div className="w-1/4 pb-[30px] gap-x-1">
      <aside className="shadow-lg">
        <div className="w-full p-[20px] bg-[#6abd45] text-white text-lg font-semibold rounded-t-lg">
          <span>DANH MỤC SẢN PHẨM</span>
        </div>

        <div className="mb-[30px] ">
          <ul
            className={`text-black font-semibold uppercase border-solid max-h-[228px] overflow-y-scroll  ${styles.list}`}
          >
            <li
              className={`${allProductsFilter ? `${styles.isActive}` : ""}`}
              onClick={handleAllProductsClick}
            >
              TẤT CẢ
            </li>

            {categories.map((item) => (
              <li
                value={item._id}
                key={item._id}
                onClick={() => {
                  setFilterByCategory(item._id);
                  setAllProductsFilter(false);
                }}
                className={`${
                  filterByCategory === item._id ? `${styles.isActive}` : ""
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <aside className="shadow-xl">
        <div className="w-full  p-[20px] bg-[#6abd45] text-white text-lg font-semibold rounded-t-lg">
          <span>LỌC THEO GIÁ</span>
        </div>
        <form className="py-[15px] px-[20px] border-gray-100 border-2 border-solid">
          <div>
            <div className="flex items-center py-[10px]">
              <Slider
                range
                defaultValue={rangePriceFilter}
                onChange={setRangePriceFilter}
                min={0}
                max={1000000}
                trackStyle={[{ background: "#ABABAB" }]}
                handleStyle={[
                  {
                    backgroundColor: "#666666",
                    borderColor: "#666666",
                    opacity: 1,
                    boxShadow: "0 0 2px 0 rgb(0 0 0 / 44%)",
                  },
                  {
                    backgroundColor: "#666666",
                    borderColor: "#666666",
                    opacity: 1,
                    boxShadow: "0 0 2px 0 rgb(0 0 0 / 44%)",
                  },
                ]}
              />
            </div>

            <div className="flex justify-between ">
              <div>
                <span className="text-xs mr-[5px]">Giá</span>
                <span className="text-xs font-semibold ">
                  {formatCurrency(rangePriceFilter[0])}
                </span>
                <span className="text-xs font-semibold"> - </span>
                <span className="text-xs font-semibold">
                  {formatCurrency(rangePriceFilter[1])}
                </span>
              </div>
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
}
