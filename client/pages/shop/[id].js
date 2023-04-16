import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Slider from "react-slick";
import { Rating } from "react-simple-star-rating";
import formatCurrency from "@/utils/formatCurrency";
import Description from "@/components/Product/Description";
import Feedback from "@/components/Product/Feedback";
import ProductsCarousel from "@/components/Product/ProductsCarousel";

import { products } from "@/api/data";

export default function Shop() {
  const router = useRouter();
  const { id } = router.query;

  const [tab, setTab] = useState(0);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container">
      <div className="flex bg-white rounded-xl my-28 py-10">
        <div className="w-1/2 px-5">
          {products[id]?.images && (
            <React.Fragment>
              <Slider
                fade={true}
                asNavFor={nav2}
                arrows={false}
                lazyLoad={true}
                ref={(slider1) => setNav1(slider1)}
              >
                {products[id].images.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt="product"
                    width={260}
                    height={120}
                    priority
                  />
                ))}
              </Slider>
              <div className="productSliderNav">
                <Slider
                  arrows={true}
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={5}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {products[id]?.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt="product"
                      width={260}
                      height={120}
                      priority
                    />
                  ))}
                </Slider>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="w-1/2 px-5">
          {/* info */}
          <h1 className="font-semibold text-3xl ">{products[id]?.name}</h1>
          <div className="mt-2 flex items-center gap-x-2">
            <p className="text-primary underline font-bold mt-1">
              {products[id]?.ratingsAverage}
            </p>
            <Rating
              allowFraction
              size={20}
              readonly={true}
              initialValue={4.5}
              SVGclassName="react-start"
            />
            <p className="mt-1 underline text-primary">
              {products[id]?.ratingsQuantity} đánh giá
            </p>
          </div>
          <div className="mt-2">
            <span className="font-semibold">
              Tình trạng:
              {products[id]?.quantity && products[id].quantity > 0 ? (
                <span className="text-[#6abd45] ml-[5px] font-normal">
                  Còn hàng
                </span>
              ) : (
                <span className="text-[#6abd45] ml-[5px] font-normal">
                  Hết hàng
                </span>
              )}
            </span>
          </div>
          <div className="mt-2">
            <span className="font-semibold">
              Danh Mục:
              <span className="text-[#6abd45] ml-[5px] font-normal">
                {products[id]?.category.name}
              </span>
            </span>
          </div>
          <div className="flex items-center bg-[#f1f1f1] px-3 py-3 rounded-lg text-3xl my-[20px] gap-x-4">
            {products[id]?.percentageDiscount ? (
              <React.Fragment>
                <div className="flex items-end">
                  <h1 className="text-[#6abd45]">
                    {formatCurrency(
                      products[id].price -
                        products[id].price * products[id].percentageDiscount,
                    )}
                  </h1>
                  <h1 className="text-[#000000] text-base ml-[5px] line-through">
                    {formatCurrency(products[id].price)}
                  </h1>
                </div>
                <p className="text-[#fff] text-xl py-[10px] px-[5px] font-semibold bg-[#f57224] rounded-lg">
                  GIẢM 20%
                </p>
              </React.Fragment>
            ) : (
              <h1 className="text-[#6abd45]">
                {formatCurrency(products[id]?.price)}
              </h1>
            )}
          </div>
          <div className="text-base text-[#353535]">
            <p className="px-[10px] py-[5px]">- Hotline hỗ trợ 1900 636 648</p>
            <p className="px-[10px] py-[5px]">- Sản phẩm chất lượng</p>
            <p className="px-[10px] py-[5px]">- Đảm bảo tươi ngon</p>
            <p className="px-[10px] py-[5px]">- Giao hàng trực tiếp từ vườn</p>
            <p className="px-[10px] py-[5px]">- Đổi trả trong vòng 12h</p>
          </div>

          <div className="my-6 flex items-center gap-x-10">
            <div className="flex items-center gap-x-5">
              <h1 className="font-semibold">Số lượng:</h1>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  className="w-[25px] h-[40px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal"
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-[65px] h-[40px] border-[1px] border-solid text-center outline-none"
                  value={quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (typeof value === "number" && !isNaN(value)) {
                      setQuantity(+e.target.value);
                    } else {
                      setQuantity(1);
                    }
                  }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-[25px] h-[40px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal"
                >
                  +
                </button>
              </div>
            </div>
            <button className="text-[#6abd45] px-5 py-3 text-base font-semibold rounded-md border-solid border-2 border-[#6abd45] hover:bg-primary hover:text-white">
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>
        </div>
      </div>

      <div className="mb-32 bg-white p-5 rounded-xl">
        {/* Mô tả, đánh giá */}
        <ul className="flex mb-5">
          <li
            onClick={() => setTab(0)}
            className={`${
              tab === 0 ? "bg-primary text-white" : ""
            } bg-[#eee] mr-[10px] text-[#333] px-5 py-3 text-base font-semibold hover:opacity-70 rounded-md cursor-pointer`}
          >
            Mô tả
          </li>
          <li
            onClick={() => setTab(1)}
            className={`${
              tab === 1 ? "bg-primary text-white" : ""
            } bg-[#EEEEEE] mr-[10px] text-[#333333] px-5 py-3 text-base font-semibold hover:opacity-70 rounded-md cursor-pointer `}
          >
            Đánh giá
          </li>
        </ul>
        {tab === 0 ? <Description /> : <Feedback />}
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
