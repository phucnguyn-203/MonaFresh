import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import Slider from "react-slick";
import formatCurrency from "@/utils/formatCurrency";
import Description from "@/components/product/Description";
import Feedback from "@/components/product/Feedback";
import ProductsCarousel from "@/components/product/ProductsCarousel";
import productAPI from "@/api/productAPI";
import IconCheck from "@/components/icons/check";
import jsUcfirst from "@/utils/jsUcfirst";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addAnItemToCart } from "@/features/cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Shop({ product, similarProducts }) {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [quantity, setQuantity] = useState(1);

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddAnItemToCart = async () => {
    if (!auth.isAuth) {
      router.push("/login");
      return;
    }
    try {
      unwrapResult(
        await dispatch(addAnItemToCart({ productId: product._id, quantity })),
      );
      Swal.fire({
        icon: "success",
        title: "Sản phẩm đã được thêm vào giỏ hàng",
        confirmButtonColor: "#6abd45",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="flex bg-white rounded-xl my-28 py-10">
        <div className="w-1/2 px-5">
          {product?.images && (
            <React.Fragment>
              <Slider
                fade={true}
                asNavFor={nav2}
                arrows={false}
                lazyLoad={true}
                ref={(slider1) => setNav1(slider1)}
              >
                {Array.from([product?.thumbnail, ...product.images]).map(
                  (img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt="product"
                      width={260}
                      height={120}
                      priority
                    />
                  ),
                )}
              </Slider>
              <div className="productSliderNav">
                {product?.images.length > 0 && (
                  <Slider
                    arrows={true}
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  >
                    {Array.from([product?.thumbnail, ...product.images]).map(
                      (img, index) => (
                        <Image
                          key={index}
                          src={img}
                          alt="product"
                          width={260}
                          height={120}
                          priority
                        />
                      ),
                    )}
                  </Slider>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="w-1/2 px-5">
          {/* info */}
          <h1 className="font-semibold text-3xl ">
            {product?.name && jsUcfirst(product?.name)}
          </h1>
          <div className="mt-2 flex items-center gap-x-2">
            <p className="text-primary underline font-bold mt-1">
              {product?.ratingsAverage.toFixed(1)}
            </p>

            <Rating
              allowFraction
              transition
              initialValue={product?.ratingsAverage}
              size={20}
              SVGclassName="react-start"
            />
            <p className="mt-1 underline text-primary">
              {product?.ratingsQuantity} đánh giá
            </p>
          </div>
          <div className="mt-2">
            <span className="font-semibold">
              Tình trạng:
              {product?.quantity && product.quantity > 0 ? (
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
                {product?.category?.name}
              </span>
            </span>
          </div>
          <div className="flex items-center bg-[#f1f1f1] px-3 py-3 rounded-lg text-3xl my-[20px] gap-x-4">
            {product?.percentageDiscount ? (
              <React.Fragment>
                <div className="flex items-end">
                  <h1 className="text-[#6abd45]">
                    {formatCurrency(
                      product.price -
                        product.price * product.percentageDiscount,
                    )}
                  </h1>
                  <h1 className="text-[#000000] text-base ml-[5px] line-through">
                    {formatCurrency(product.price)}
                  </h1>
                </div>
                <p className="text-[#fff] text-xl  py-[10px] px-[5px] font-semibold bg-[#f57224] rounded-lg">
                  GIẢM {product.percentageDiscount * 100}%
                </p>
              </React.Fragment>
            ) : (
              <h1 className="text-[#6abd45]">
                {formatCurrency(product?.price)}
              </h1>
            )}
          </div>
          <div className="text-base text-[#353535]">
            <p className="px-[10px] py-[5px] flex items-center ">
              <span className="pr-1">
                <IconCheck />
              </span>
              Hotline hỗ trợ 1900 636 648
            </p>
            <p className="px-[10px] py-[5px] flex items-center">
              <span className="pr-1">
                <IconCheck />
              </span>
              Sản phẩm chất lượng
            </p>
            <p className="px-[10px] py-[5px] flex items-center">
              <span className="pr-1">
                <IconCheck />
              </span>
              Đảm bảo tươi ngon
            </p>
            <p className="px-[10px] py-[5px] flex items-center">
              <span className="pr-1">
                <IconCheck />
              </span>
              Giao hàng trực tiếp từ vườn
            </p>
            <p className="px-[10px] py-[5px] flex items-center">
              <span className="pr-1">
                <IconCheck />
              </span>
              Đổi trả trong vòng 12h
            </p>
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
                  type="number"
                  className="w-[65px] h-[40px] border-[1px] border-solid text-center outline-none"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value));
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
            {cart.items.find((item) => item.product._id === product._id) ? (
              <button className="bg-[#CCCCCC] text-white px-5 py-3 text-base font-semibold rounded-md border-solid cursor-not-allowed">
                Sản phẩm đã thêm vào giỏ
              </button>
            ) : (
              <button
                onClick={handleAddAnItemToCart}
                className="text-[#6abd45] px-5 py-3 text-base font-semibold rounded-md border-solid border-2 border-[#6abd45] hover:bg-primary hover:text-white"
              >
                THÊM VÀO GIỎ HÀNG
              </button>
            )}
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
        {tab === 0 ? (
          <Description description={product?.description} />
        ) : (
          <Feedback product={product} />
        )}
      </div>
      <div className="mb-[50px]">
        <h1 className="text-center text-2xl font-semibold py-[10px]">
          SẢN PHẨM TƯƠNG TỰ
        </h1>
        <ProductsCarousel products={similarProducts} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  try {
    const product = await productAPI.getOneProduct(id);
    const similarProducts = await productAPI.getSimilarProducts({
      _id: product.data._id,
      category: product.data.category._id,
    });
    return {
      props: { product: product.data, similarProducts: similarProducts.data },
    };
  } catch (err) {
    return {
      props: {
        product: null,
        similarProducts: null,
      },
    };
  }
}
