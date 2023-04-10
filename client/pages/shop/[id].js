import { useRouter } from "next/router";
import styles from "@/styles/ProductDetail.module.css";
import { useState } from "react";

import { products } from "@/api/data";
import formatCurrency from "@/utils/formatCurrency";
import { IconTechcombank, IconPaypal } from "@/components/icons";
import Description from "@/components/Product/Description";
import Feedback from "@/components/Product/Feedback";
import ProductsCarousel from "@/components/Product/ProductsCarousel";

export default function Shop() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [type, setType] = useState("Mô tả");

  const btns = ["Mô tả", "Đánh giá"];

  return (
    <div className={`container`}>
      <div className={`${styles.productDetailContainer} `}>
        <div className="w-2/5 mt-[10px]">
          {/* image */}
          <div>
            <div>
              <div
                style={{ backgroundImage: `url(${products[0].thumbnail})` }}
                className={`${styles.productThumnail} pt-[100%] bg-no-repeat bg-contain bg-center`}
              ></div>
            </div>
          </div>
          <div className="w-full mt-[10px] bg-[red]">
            <h1>Pagination</h1>
          </div>
        </div>
        <div className="w-3/5 mt-[10px]">
          {/* info */}
          <h1 className="font-semibold text-3xl ">{products[0].name}</h1>
          <div className="mt-[5px]">
            <span>
              Tình trạng:
              <span className="text-[#6abd45] ml-[5px]">Còn hàng</span>
            </span>
          </div>
          <div className="flex items-end w-2/4 bg-[#f1f1f1] px-[10px] py-[5px] rounded-lg text-3xl my-[20px]">
            <h1 className="text-[#6abd45]">
              {formatCurrency(products[0].price)}
            </h1>
            <h1 className="text-[#000000] text-base ml-[5px] line-through">
              {formatCurrency(products[0].price - 10000)}
            </h1>
          </div>
          <div className="text-base text-[#353535]">
            <p className="px-[10px] py-[5px]">Sản phẩm chất lượng</p>
            <p className="px-[10px] py-[5px]">Giao hàng trực tiếp từ vườn</p>
            <p className="px-[10px] py-[5px]">Đổi trả trong vòng 12h</p>
          </div>
          <div className="flex flex-col items-center w-2/4 text-xl text-center mb-[10px]">
            <p className="font-semibold py-[20px]">Khuyến mãi bất ngờ</p>
            <p className="w-1/3 text-[#fff] py-[10px] px-[5px] font-semibold bg-[#f57224] rounded-lg">
              GIẢM 20%
            </p>
          </div>
          <from>
            <div className="mb-[20px]">
              <h1 className="mb-[10px] text-[#000000] text-base">Số lượng:</h1>
              <div className="flex w-2/4 justify-between items-center">
                <div className="">
                  <input
                    type="button"
                    className="w-[30px] h-[40px] border-[1px] border-solid text-center cursor-pointer"
                    value="-"
                  />
                  <input
                    type="text"
                    className="w-[65px] h-[40px] border-[1px] border-solid text-center "
                    value="1"
                    step="1"
                    min="1"
                    max="100"
                  />
                  <input
                    type="button"
                    className="w-[30px] h-[40px] border-[1px] border-solid text-center cursor-pointer"
                    value="+"
                  />
                </div>
                <button className="bg-[#abe5b51a] text-[#6abd45] px-5 py-3 text-base font-semibold hover:opacity-70 rounded-md  border-solid border-2 border-[#6abd45]">
                  THÊM VÀO GIỎ HÀNG
                </button>
              </div>
            </div>

            <div className="py-[10px] my-[20px] text-[#353535] text-base">
              <div className="flex items-center">
                <strong className="mr-[20px]">Thanh toán: </strong>
                <div className="w-[100px] h-[50px]">
                  <IconPaypal />
                </div>
                <div className="w-[100px] h-[50px]">
                  <IconTechcombank />
                </div>
              </div>
            </div>
          </from>
        </div>
      </div>
      <div className={`${styles.description} bg-white`}>
        {/* Mô tả, đánh giá */}
        <ul className="flex p-[20px]">
          {btns.map((btn) => (
            <li>
              <button
                key={btn}
                onClick={() => setType(btn)}
                className={`${styles.btn} ${
                  type === btn ? `${styles.btnActive}` : ``
                } bg-[#eee] mr-[10px] text-[#333] px-5 py-3 text-base font-semibold hover:opacity-70 rounded-md `}
              >
                {btn}
              </button>
            </li>
          ))}
        </ul>
        <div>
          <ul>{type === "Mô tả" ? <Description /> : <Feedback />}</ul>
        </div>
      </div>
      <div className="mb-[50px]">
        <h1 className="text-center text-2xl font-semibold py-[10px]">
          SẢN PHẨM TƯƠNG TỰ
        </h1>
        <ProductsCarousel products={products} />
      </div>
    </div>
  );
}
