import ProductFeedback from "@/components/product/ProductFeedback";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import formatTimestamp from "@/utils/formatTimestamp";
import productAPI from "@/api/productAPI";

export default function Feedback({ product }) {
  const [filterByRating, setFilterByRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);

  const arr = [1, 2, 3, 4, 5];

  useEffect(() => {
    getAllFeedback();
  }, [filterByRating]);

  const getAllFeedback = async () => {
    let params = {
      sort: "-createdAt",
    };

    if (filterByRating !== 0) {
      params.rating = filterByRating;
    }
    try {
      const response = await productAPI.getAllFeedback(product._id, params);
      setFeedbacks(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <h1 className="text-[#1C1C1C] text-2xl font-semibold">Đánh giá </h1>
      <div className=" w-full ">
        <div className="rounded-[8px] flex w-[75%] bg-[#e1fcd78f] py-[20px] my-[20px]">
          <div className="flex-col w-[20%] basis-[20%] justify-center">
            <div className="flex basis-full w-full justify-center">
              <p className="flex justify-center text-primary text-[25px] font-bold mt-1 w-full">
                {product?.ratingsAverage.toFixed(1)} trên 5
              </p>
            </div>
            <div className="flex basis-full w-full justify-center">
              <Rating
                allowFraction
                transition
                initialValue={product?.ratingsAverage}
                size={20}
                SVGclassName="react-start"
              />
            </div>
          </div>
          <div className="w-[80%] basis-[80%] flex items-center">
            <button
              key={0}
              onClick={() => setFilterByRating(0)}
              className={`w-[13%] h-[40px] mx-[15px] border-[2px] rounded-[8px] bg-white border-[#ececec] font-[450] hover:border-[#6abd45] hover:text-[#6abd45]
                                ${
                                  filterByRating === 0
                                    ? "!border-[#6abd45] !text-[#6abd45]"
                                    : ""
                                }`}
            >
              Tất cả {filterByRating === 0 ? `(${feedbacks.length})` : ""}
            </button>
            {arr.map((i) => (
              <button
                key={i}
                onClick={() => setFilterByRating(i)}
                className={`w-[13%] h-[40px] mx-[15px] border-[2px] rounded-[8px] bg-white border-[#ececec] font-[450] hover:border-[#6abd45] hover:text-[#6abd45]
                                ${
                                  filterByRating === i
                                    ? "!border-[#6abd45] !text-[#6abd45]"
                                    : ""
                                }`}
              >
                {i} Sao {filterByRating === i ? `(${feedbacks.length})` : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
      {feedbacks.length ? (
        <>
          {feedbacks.map((feedback, index) => (
            <div key={index}>
              <ProductFeedback
                photo={feedback.customer.photo}
                name={feedback.customer.name}
                rating={feedback.rating}
                feedback={feedback.feedback}
                createdAt={formatTimestamp(feedback.createdAt)}
              />
            </div>
          ))}
        </>
      ) : (
        <h1 className="my-[20px] text-sm font-semibold">
          Chưa có đánh giá nào
        </h1>
      )}
    </React.Fragment>
  );
}
