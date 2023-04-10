import Image from "next/image";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import styles from "@/styles/ProductDetail.module.css";

export default function ProductFeedback({ src, name, rating, comment }) {
  const myLoader = () => {
    return `${src}`;
  };
  const [rate, setRate] = useState(0);
  // Catch Rating value
  const handleRating = (rate) => {
    setRate(rate);
  };

  const handleReset = () => {
    // Set the initial value
    setRate(0);
  };
  return (
    <div className="mb-[15px]">
      <div className="flex items-center">
        <Image
          className="rounded-full object-cover"
          loader={myLoader}
          src={src}
          width={25}
          height={25}
        />
        <h1 className="ml-[10px] text-base font-bold">{name}</h1>
      </div>
      <div className="px-[50px] mt-[10px]">
        <div className="px-[20px] bg-[#f3f4f6] w-3/4 min-h-[60px] rounded-md">
          <div>
            <Rating
              size={20}
              readonly={true}
              iconsCount={rating}
              emptyColor="#f1a545"
              SVGclassName={`${styles.editStar}`}
            />
            <Rating
              size={20}
              readonly={true}
              iconsCount={5 - rating}
              emptyColor="#cccccc"
              SVGclassName={`${styles.editStar}`}
            />
          </div>
          <h1 className="text-base font-medium">
            Nhận xét:
            <span className="ml-[5px] font-normal">{comment}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
