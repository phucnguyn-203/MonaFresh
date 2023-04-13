import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Slider from "react-slick";
import { products } from "@/api/data";
import formatCurrency from "@/utils/formatCurrency";
import { IconCash, IconCard } from "@/components/icons";
import Description from "@/components/Product/Description";
import Feedback from "@/components/Product/Feedback";
import ProductsCarousel from "@/components/Product/ProductsCarousel";
import { Rating } from "react-simple-star-rating";

export default function Shop() {
    const router = useRouter();
    const { id } = router.query;
    const [tab, setTab] = useState(0);
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    return (
        <div className="container">
            <div className="flex bg-white rounded-xl my-28 py-10">
                <div className="w-1/2 px-5">
                    <Slider
                        fade={true}
                        asNavFor={nav2}
                        arrows={false}
                        lazyLoad={true}
                        ref={(slider1) => setNav1(slider1)}
                    >
                        {products[0].images.map((img, index) => (
                            <Image key={index} src={img} alt="product" width={260} height={120} priority />
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
                            {products[0].images.map((img, index) => (
                                <Image key={index} src={img} alt="product" width={260} height={120} priority />
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="w-1/2 px-5">
                    {/* info */}
                    <h1 className="font-semibold text-3xl ">{products[0].name}</h1>
                    <div className="mt-2 flex items-center gap-x-2">
                        <p className="text-primary underline font-bold mt-1">4.4</p>
                        <Rating allowFraction size={20} readonly={true} initialValue={4.5} SVGclassName="react-start" />
                        <p className="mt-1 underline text-primary">15 đánh giá</p>
                    </div>
                    <div className="mt-2">
                        <span className="font-semibold">
                            Tình trạng:
                            <span className="text-[#6abd45] ml-[5px] font-normal">Còn hàng</span>
                        </span>
                    </div>
                    <div className="mt-2">
                        <span className="font-semibold">
                            Danh Mục:
                            <span className="text-[#6abd45] ml-[5px] font-normal">Rau củ</span>
                        </span>
                    </div>
                    <div className="flex items-end bg-[#f1f1f1] px-3 py-3 rounded-lg text-3xl my-[20px]">
                        <h1 className="text-[#6abd45]">{formatCurrency(products[0].price)}</h1>
                        <h1 className="text-[#000000] text-base ml-[5px] line-through">
                            {formatCurrency(products[0].price - 10000)}
                        </h1>
                    </div>
                    <div className="text-base text-[#353535]">
                        <p className="px-[10px] py-[5px]">- Hotline hỗ trợ 1900 636 648</p>
                        <p className="px-[10px] py-[5px]">- Sản phẩm chất lượng</p>
                        <p className="px-[10px] py-[5px]">- Đảm bảo tươi ngon</p>
                        <p className="px-[10px] py-[5px]">- Giao hàng trực tiếp từ vườn</p>
                        <p className="px-[10px] py-[5px]">- Đổi trả trong vòng 12h</p>
                    </div>
                    {/* <div className="flex flex-col items-center text-xl text-center mb-[10px]">
                        <p className="font-semibold py-[20px]">Khuyến mãi bất ngờ</p>
                        <p className="w-1/3 text-[#fff] py-[10px] px-[5px] font-semibold bg-[#f57224] rounded-lg">
                            GIẢM 20%
                        </p>
                    </div> */}
                    <div className="my-6 flex items-center gap-x-10">
                        <div className="flex items-center gap-x-5">
                            <h1 className="font-semibold">Số lượng:</h1>
                            <div className="flex items-center">
                                <button className="w-[25px] h-[40px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal">
                                    -
                                </button>
                                <input
                                    type="text"
                                    className="w-[65px] h-[40px] border-[1px] border-solid text-center "
                                    defaultValue="1"
                                    step="1"
                                    min="1"
                                    max="100"
                                />
                                <button className="w-[25px] h-[40px] overflow-hidden relative bg-[#f9f9f9] text-[#666] border-[1px] border-[#ddd] normal-case font-normal">
                                    +
                                </button>
                            </div>
                        </div>
                        <button className="text-[#6abd45] px-5 py-3 text-base font-semibold rounded-md border-solid border-2 border-[#6abd45] hover:bg-primary hover:text-white">
                            THÊM VÀO GIỎ HÀNG
                        </button>
                    </div>

                    {/* <div className="text-[#353535] text-base">
                        <div className="flex items-center gap-x-4">
                            <p className="font-bold">Thanh toán: </p>
                            <div className="flex flex-col items-center">
                                <div className="w-[50px] h-[50px]">
                                    <IconCash />
                                </div>
                                <p>Tiền mặt</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-[50px] h-[50px]">
                                    <IconCard />
                                </div>
                                <p>Banking</p>
                            </div>
                        </div>
                    </div> */}
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
                <h1 className="text-center text-2xl font-semibold py-[10px]">SẢN PHẨM TƯƠNG TỰ</h1>
                <ProductsCarousel products={products} />
            </div>
        </div>
    );
}
