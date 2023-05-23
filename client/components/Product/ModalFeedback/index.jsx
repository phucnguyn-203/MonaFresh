import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import orderAPI from "@/api/orderAPI";
import { IconClose } from "@/components/icons";
import Swal from "sweetalert2";

export default function ModalFeedback({ createFeedback, getMyOrder, close, _id, productId, itemId }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");


  
  const handleSubmit = async() => {
    
    let data = {
      "rating" : rating,
      "feedback" : feedback,
    };
    createFeedback(productId, data);
    data = {
      "_id" : _id,
      "itemId": itemId,
    };
    await orderAPI.updateIsFeedbackOfOneItem(data);
    getMyOrder();
    close();
  };

  // Catch Rating value
  const handleRating = (rating) => {
    setRating(rating);
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
            initialValue={rating}
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
            <textarea
              onChange={(e)=> setFeedback(e.target.value)}
              className="w-full h-[120px] border-solid border-[1px] border-[#ddd] p-[10px] outline-none shadow-md"></textarea>
          </div>
          <button 
            onClick={() => {
              Swal.fire({
                title: "Bạn chắc chắn muốn gửi?",
                text: "Đánh giá sẽ được gửi và không thể thu hồi.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#6abd45",
                cancelButtonColor: "#d33",
                cancelButtonText: "Huỷ bỏ",
                confirmButtonText: "Đồng ý!",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleSubmit();
                  Swal.fire({
                    title: "Đã gửi",
                    text: "Đánh giá đã được gửi.",
                    confirmButtonColor: "#6abd45",
                  });
                }
              });
            }}
            className="bg-[#6abd45] text-[#fff] px-5 py-3 text-base font-semibold hover:bg-[#38970f] rounded-md  border-solid border-2 border-[#6abd45] mt-[30px] w-[200px]">
            GỬI
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
