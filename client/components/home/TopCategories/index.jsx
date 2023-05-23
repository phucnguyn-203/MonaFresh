import React from "react";
import Link from "next/link";
import Image from "next/image";

import Cate_1 from "@/public/assets/img/index_cate_1.png";
import Cate_2 from "@/public/assets/img/index_cate_2.png";
import Cate_3 from "@/public/assets/img/index_cate_3.png";
import Cate_4 from "@/public/assets/img/index_cate_4.png";
import Cate_5 from "@/public/assets/img/index_cate_5.png";
import Cate_6 from "@/public/assets/img/index_cate_6.png";

import Cate_1_hover from "@/public/assets/img/index_cate_1_hover.png";
import Cate_2_hover from "@/public/assets/img/index_cate_2_hover.png";
import Cate_3_hover from "@/public/assets/img/index_cate_3_hover.png";
import Cate_4_hover from "@/public/assets/img/index_cate_4_hover.png";
import Cate_5_hover from "@/public/assets/img/index_cate_5_hover.png";
import Cate_6_hover from "@/public/assets/img/index_cate_6_hover.png";

import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import categoryAPI from "@/api/categoryAPI";
const removeAccents = require("../../../utils/removeAccents");

export default function TopCategories() {
  // const [products, setProducts] = useState();

  // useEffect(() => {
  //   getAllProduct();
  // },[]);
  const [id, setId] = useState();

  const findCategory = async(nameCategory) =>{
    const params = {
      isActive: true,
      searchName: removeAccents(nameCategory).toLowerCase(),
    }
    try {
      const category = await categoryAPI.getAllCategory(params);
      
  
      setId(category.data[0]._id);
    } catch (err) {
      console.log(err);
    }
    
  };

  // const getAllProduct = async() => {
  //   let params = {
  //     sort: "-ratingsAverage",
  //     isActive: true,
  //   };
  //   try {
  //     const response = await productAPI.getAllProduct(params);
  //     setProducts(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <React.Fragment>
      <h1
        className="text-[#1C1C1C] text-center text-3xl font-bold pt-[50px] pb-[40px]"
        data-aos="fade-up"
      >
        Mua sản phẩm được lựa chọn từ vườn
      </h1>
      <div
        className="flex flex-row justify-between items-center content-center"
        data-aos="fade-up"
      >
        <div className="">
        <button onClick={()=>findCategory("rau củ quả")}>
        <Link 
          href={{ pathname: '/shop', query: {id: "646c84581c0a82e65d521ff1"} }}
        >
          <div className={styles.parent}>
            <Image src={Cate_1} alt="" className="" />
            <div
              className={`${styles.overlay} absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10`}
            >
              <Image src={Cate_1_hover} alt="" />
            </div>
          </div>

          <div className="py-2"></div>
          <h3 className="text-center font-semibold text-2xl text-gray-700 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
            Rau củ quả
          </h3>
          </Link>
          </button>
        </div>
        <div className="">
        <Link 
          href={{ pathname: '/shop', query: {id: ""} }}
        >
          <div className={styles.parent}>
            <Image src={Cate_2} alt="" className="" />
            <div
              className={`${styles.overlay} absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10`}
            >
              <Image src={Cate_2_hover} alt="" />
            </div>
          </div>

          <div className="py-2"></div>
          <h3 className="text-center font-semibold text-2xl text-gray-700 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
            Hải sản
          </h3>
          </Link>
        </div>
        <div className="">
        <Link 
          href={{ pathname: '/shop', query: {id: "646c838fa128e9d8204d7fb8"} }}
        >
          <div className={styles.parent}>
            <Image src={Cate_3} alt="" className="" />
            <div
              className={`${styles.overlay} absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10`}
            >
              <Image src={Cate_3_hover} alt="" />
            </div>
          </div>

          <div className="py-2"></div>
          <h3 className="text-center font-semibold text-2xl text-gray-700 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
            Thịt các loại
          </h3>
          </Link>
        </div>
        <div className="">
        <Link 
          href={{ pathname: '/shop', query: {id: "646c8331d3e7db0ffb85690d"} }}
        >
          <div className={styles.parent}>
            <Image src={Cate_4} alt="" className="" />
            <div
              className={`${styles.overlay} absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10`}
            >
              <Image src={Cate_4_hover} alt="" />
            </div>
          </div>

          <div className="py-2"></div>
          <h3 className="text-center font-semibold text-2xl text-gray-700 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
            Trái cây
          </h3>
          </Link>
        </div>
        <div className="">
        <Link 
          href={{ pathname: '/shop', query: {id: ""} }}
        >
          <div className={styles.parent}>
            <Image src={Cate_5} alt="" className="" />
            <div
              className={`${styles.overlay} absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10`}
            >
              <Image src={Cate_5_hover} alt="" />
            </div>
          </div>

          <div className="py-2"></div>
          <h3 className="text-center font-semibold text-2xl text-gray-700 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
            Đồ khô
          </h3>
          </Link>
        </div>
        <div className="">
        <Link 
          href={{ pathname: '/shop', query: {id: "646c8334ce409519e81fe533"} }}
        >
          <div className={styles.parent}>
            <Image src={Cate_6} alt="" className="" />
            <div
              className={`${styles.overlay} absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10`}
            >
              <Image src={Cate_6_hover} alt="" />
            </div>
          </div>

          <div className="py-2"></div>
          <h3 className="text-center font-semibold text-2xl text-gray-700 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
            Thức uống
          </h3>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
