import Image from "next/image";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function ProductFeedback({
  photo,
  name,
  rating,
  feedback,
  createdAt,
}) {
  return (
    <div className="mb-[15px]">
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden w-10 h-10 relative">
          <Image src={photo} fill alt="avatar" />
        </div>
        <div className="ml-3">
          <h1 className="text-base font-bold">{name}</h1>
          <p className="text-sm text-gray-500">{createdAt}</p>
        </div>
      </div>
      <div className="px-[50px] mt-[10px]">
        <div className="p-5 bg-[#f3f4f6] w-3/4 rounded-md">
          <div className="flex items-center">
            <p className="mt-1 font-semibold">Đánh giá: </p>
            <Rating
              allowFraction
              size={20}
              readonly={true}
              initialValue={rating}
              SVGclassName="react-start"
            />
          </div>
          <h1 className="text-base font-semibold">
            Nhận xét:
            <span className="ml-[5px] font-normal">{feedback}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
