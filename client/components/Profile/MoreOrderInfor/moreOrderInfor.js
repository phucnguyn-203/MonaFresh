import Styles from ".//styles.module.css";
import React, { useState } from "react";

export default function MoreOderInfor({ order, close }) {
  const address =
    order.deliveryAddress.note +
    ", " +
    order.deliveryAddress.ward +
    ", " +
    order.deliveryAddress.district +
    ", " +
    order.deliveryAddress.province;
  return (
    <React.Fragment>
      <div
        onClick={close}
        className="bg-black/30 top-0 right-0 left-0 bottom-0 fixed w-full h-full"
      ></div>
      <div className="h-[85%] mt-[40px] px-[20px] rounded-[8px] z-10 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  min-w-[60%] bg-white">
        <div className="mb-[30px] mt-[10px] w-full h-20px">
          <div className="flex justify-between  items-center  ">
            <div className=" uppercase text-[25px] font-[600]">
              Thông tin đơn hàng
            </div>
            <div className="text-[20px] font-[450]">#{order.id}</div>
          </div>
          <div className="text-[14px] flex justify-end items-center">
            {order.createdDate}
          </div>
        </div>

        <div className="flex px-[20px] ">
          <div className=" w-[60%] basis-[60%] border-r-[1px] border-[#ececec]">
            <div className="text-[18px] font-[500] mb-[10px]">
              Địa chỉ nhận hàng
            </div>
            <div className="text-gray-500 text-[13px] font-[400]">
              <div className="text-[15px] text-[black] mb-[5px] font-[450]">
                {order.deliveryAddress.name}
              </div>
              <div className="mb-[3px]">{order.deliveryAddress.phone}</div>
              <div>{address}</div>
            </div>
          </div>
          <div className=" w-[40%] basis-[40%] justify-end">
            <div className="text-[18px] font-[500] mb-[10px] flex justify-end">
              Đơn hàng
            </div>
            <div className="text-gray-500 text-[14px] font-[400] ">
              <div className=" mb-[5px] flex justify-end">{order.status}</div>
              <div className="mb-[3px] flex justify-end">
                {order.paymentMethod}
              </div>
              <div className="flex justify-end">{order.paymentStatus}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
