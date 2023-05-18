import styles from ".//styles.module.css";
import formatCurrency from "@/utils/formatCurrency";
import React, { useState } from "react";
import { IconClose } from "@/components/icons";
{
  /* <p>{formatCurrency(price - price * percentageDiscount)}</p> */
}
export default function MoreOderInfor({ order, close }) {
  console.log(order);
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
      <div
        className={`  h-[85%] mt-[40px] px-[55px] rounded-[8px] z-10 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  min-w-[60%] bg-white`}
      >
        <div className="flex">
          <div className="justify-end absolute z-5 right-0 top-0  ">
            <div
              onClick={close}
              className="flex  items-center  w-[50px] text-left rounded-bl-[8px] rounded-tr-[8px] bg-[#ee4d2d] text-[#fff] h-[40px] text-[25px] cursor-pointer hover:bg-[#e8340c]"
            >
              <IconClose />
            </div>
          </div>
        </div>
        <div className={`${styles.navbar} w-full h-full`}>
          <div className="mb-[30px] mt-[40px] w-full h-20px">
            <div className="flex justify-between  items-center  ">
              <div className=" uppercase text-[25px] font-[600]">
                Thông tin đơn hàng
              </div>
              <div className="text-[20px] font-[450]">
                Mã đơn hàng: #{order.id}
              </div>
            </div>
            <div className="text-[14px] flex justify-end items-center">
              Ngày đặt hàng: {order.createdDate}
            </div>
          </div>

          <div className="flex px-[20px] ">
            <div className=" w-[60%] basis-[60%] border-r-[1px] border-[#ececec]">
              <div className="text-[18px] font-[500] mb-[10px]">
                Thông tin địa chỉ
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
          <div className="my-[30px] px-[20px]">
            <div className="rounded-lg border-x-[1px] border-[#ececec]">
              <div className="rounded-t-lg uppercase text-[15px] font-[500] px-[20px] items-center justify-between bg-primary py-4 ">
                <div className="flex text-white w-full text-center justify-center items-center">
                  <div className="w-[40%] bassis-[40%] text-left">
                    Tên sản phẩm
                  </div>
                  <div className="w-[20%] bassis-[20%]">Giá tiền</div>
                  <div className="w-[20%] bassis-[20%]">Số lượng</div>
                  <div className="w-[20%] bassis-[20%] text-right">
                    Thành tiền
                  </div>
                </div>
              </div>
              {order.orderDetail.map((item) => (
                <div
                  key={item.id}
                  className="min-h-[40px] px-[20px] py-[20px] flex w-full text-center justify-center items-center border-b-[1px] border-[#ececec] last:border-0"
                >
                  <div className="w-[40%] bassis-[40%] text-left text-[15px]">
                    {item.name}
                  </div>
                  <div className="w-[20%] bassis-[20%]">
                    {item.percentageDiscount === 0 ? (
                      <React.Fragment>
                        <p className="text-primary">
                          {formatCurrency(item.price)}
                        </p>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <p className="text-primary">
                          {formatCurrency(
                            item.price - item.price * item.percentageDiscount,
                          )}
                        </p>
                        <p className="text-sm text-[#0000008a] font-normal line-through">
                          {formatCurrency(item.price)}
                        </p>
                      </React.Fragment>
                    )}
                  </div>
                  <div className="w-[20%] bassis-[20%] font-[500]">
                    {item.quantity}
                  </div>
                  <div className="w-[20%] bassis-[20%] text-right">
                    <p className="text-primary">{formatCurrency(item.total)}</p>
                  </div>
                </div>
              ))}
              <div className=" px-[20px]  items-center text-white justify-between rounded-b-[8px] bg-[#6abd45] w-full">
                <div className=" flex justify-end items-center ">
                  <div className="flex w-[40%] basiss-[40%] items-center">
                    <div className="w-[60%] basiss[60%] flex justify-start text-[15px] font-[450] mr-[5px]">
                      Tổng tạm:{" "}
                    </div>
                    <div className="w-[40%] basiss[40%] flex justify-end text-[21px] font-[500]">
                      {formatCurrency(order.orderTotal)}
                    </div>
                  </div>
                </div>

                <div className=" flex justify-end items-center ">
                  <div className="flex w-[40%] basiss-[40%] items-center">
                    <div className="w-[60%] basiss[60%] flex justify-start text-[15px] font-[450] mr-[5px]">
                      Phí vận chuyển:{" "}
                    </div>
                    <div className="w-[40%] basiss[40%] flex justify-end text-[21px] font-[500]">
                      {formatCurrency(0)}
                    </div>
                  </div>
                </div>

                <div className=" flex justify-end items-center ">
                  <div className="flex w-[40%] basiss-[40%] items-center">
                    <div className="w-[60%] basiss[60%] flex justify-start text-[15px] font-[450] mr-[5px]">
                      Tổng đơn hàng:{" "}
                    </div>
                    <div className="w-[40%] basiss[40%] flex justify-end text-[21px] font-[500]">
                      {formatCurrency(order.orderTotal)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
