import { useState } from "react";
import Slider from "rc-slider";
import styles from "./styles.module.css";

export default function Sidebar() {
  // className="w-1/4 pr-[18px] pb-[30px] gap-x-1"
  const [cost, setCost] = useState([0, 1000000]);
  return (
    <div className="w-1/4 pb-[30px] gap-x-1">
      <aside>
        <div className="w-full  p-[20px] bg-[#6abd45] text-white text-lg font-semibold rounded-t-lg">
          <span>DANH MỤC SẢN PHẨM</span>
        </div>

        <div className="mb-[30px] ">
          <ul
            className={`text-black font-semibold  border-solid ${styles.list}`}
          >
            <li>
              <a>Rau củ</a>
            </li>
            <li>
              <a>Hải sản</a>
            </li>
            <li>
              <a>Trái cây</a>
            </li>
            <li>
              <a>Đồ uống</a>
            </li>
            <li>
              <a>Đồ khô</a>
            </li>
            <li>
              <a>Thịt trứng</a>
            </li>
          </ul>
        </div>
      </aside>

      <aside>
        <div className="w-full  p-[20px] bg-[#6abd45] text-white text-lg font-semibold rounded-t-lg">
          <span>LỌC THEO GIÁ</span>
        </div>
        <form className="py-[15px] px-[20px] border-gray-100 border-2 border-solid">
          <div>
            <div className="flex items-center py-[10px]">
              <Slider
                range
                defaultValue={cost}
                onChange={setCost}
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
              <button className="rounded-xl cursor-pointer px-3 text-[10px] mr-4 bg-gray-500 text-white font-medium text-center">
                LỌC
              </button>
              <div>
                <span className="text-xs mr-[5px]">Giá</span>
                <span className="text-xs font-semibold ">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(cost[0])}
                </span>
                <span className="text-xs font-semibold"> - </span>
                <span className="text-xs font-semibold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(cost[1])}
                </span>
              </div>
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
}