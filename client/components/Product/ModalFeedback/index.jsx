import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

import { IconClose } from "@/components/icons";

export default function ModalFeedback({ close }) {
  const [rate, setRate] = useState(5);
  // Catch Rating value
  const handleRating = (rate) => {
    setRate(rate);
  };
  return (
    <React.Fragment>
      <div
        onClick={close}
        className="bg-black/30 top-0 right-0 left-0 bottom-0 fixed w-full h-full"
      ></div>
      <div className="flex items-center text-left  mt-[40px] p-[15px] rounded-[8px] z-10 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  min-w-[60%] bg-white">
        <div className="px-[20px] py-[0px] w-full min-h-[420px] ">
          <h1 className="text-2xl font-semibold mb-[10px]">
            Nhận xét sản phẩm
          </h1>
          <button
            onClick={close}
            className="fixed top-0 right-0 bg-[red] p-[10px] text-white rounded-tr-[8px] text-2xl"
          >
            <IconClose />
          </button>
          <h2 className="font-medium mb-[8px]">Đánh giá của bạn</h2>
          <Rating
            onClick={handleRating}
            transition
            initialValue={rate}
            size={30}
            SVGclassName="react-start"
            showTooltip
            tooltipArray={[
              "Tệ",
              "Không hài lòng",
              "Bình thường",
              "Hài lòng",
              "Tuyệt vời",
            ]}
          />
          <div>
            <h3 className="my-[8px] font-medium">Nhận xét của bạn</h3>
            <textarea className="w-full h-[120px] border-solid border-[1px] border-[#ddd] p-[10px] outline-none shadow-md"></textarea>
          </div>
          <button className="bg-[#6abd45] text-[#fff] px-5 py-3 text-base font-semibold hover:bg-[#38970f] rounded-md  border-solid border-2 border-[#6abd45] mt-[30px] w-[200px]">
            GỬI
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
