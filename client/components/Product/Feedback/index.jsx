import ProductFeedback from "@/components/Product/ProductFeedback";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function Feedback() {
  const feedbacks = [
    {
      name: "Võ Hồng Nguyên",
      src: "https://taimienphi.vn/tmp/cf/aut/Z2sk-hinh-anh-avatar-dep-1.jpg",
      rating: 4,
      feedback: "Sản phẩm khá tốt.",
    },
    {
      name: "Nguyễn Hoàng Phúc",
      src: "https://taimienphi.vn/tmp/cf/aut/Z2sk-hinh-anh-avatar-dep-1.jpg",
      rating: 3,
      feedback: "Sản phẩm không tốt.",
    },
    {
      name: "Trần Ngọc Tân",
      src: "https://taimienphi.vn/tmp/cf/aut/Z2sk-hinh-anh-avatar-dep-1.jpg",
      rating: 5,
      feedback: "Sản phẩm không giống quảng cáo.",
    },
    {
      name: "Võ Anh Phụng",
      src: "https://taimienphi.vn/tmp/cf/aut/Z2sk-hinh-anh-avatar-dep-1.jpg",
      rating: 2,
      feedback: "Sản phẩm quá bình thường.",
    },
  ];
  const [rate, setRate] = useState(5);
  // Catch Rating value
  const handleRating = (rate) => {
    setRate(rate);
  };
  return (
    <React.Fragment>
      <h1 className="text-[#1C1C1C] text-2xl font-semibold">Đánh giá</h1>
      {feedbacks.length ? (
        <>
          <h1 className="my-[20px] text-sm font-semibold">
            Có {feedbacks.length} đánh giá
          </h1>
          {feedbacks.map((feedback, index) => (
            <div key={index}>
              <ProductFeedback
                src={feedback.src}
                name={feedback.name}
                rating={feedback.rating}
                feedback={feedback.feedback}
              />
            </div>
          ))}
        </>
      ) : (
        <h1 className="my-[20px] text-sm font-semibold">
          Chưa có đánh giá nào
        </h1>
      )}
      <div className="px-[20px] py-[10px] w-full min-h-[420px] border-solid border-2 border-[#6abd45]">
        <h1 className="text-2xl font-semibold mb-[10px]">Nhận xét sản phẩm</h1>
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
        <button className="bg-[#6abd45] text-[#fff] px-5 py-3 text-base font-semibold hover:bg-[#38970f] rounded-md  border-solid border-2 border-[#6abd45] mt-[30px]">
          GỬI
        </button>
      </div>
    </React.Fragment>
  );
}
