import { useEffect, useState } from "react";
import React from "react";
import styles from "./styles.module.css";
import { IconSearch } from "@/components/icons";
import MoreOderInfor from "../MoreOrderInfor";
import formatCurrency from "@/utils/formatCurrency";
import ModalFeedback from "../../Product/ModalFeedback";

export default function MyOders() {
  const [tab, setTab] = useState(0);
  const [showMoreOder, setShowMoreOrder] = useState(false);
  const [orderDropdown, setOrderDropdown] = useState(0);
  const [showModalFeedback, setShowModalFeedback] = useState(false);
  const handleClose = () => {
    setShowMoreOrder(!showMoreOder);
  };
  const handleCloseModalFeedback = () => {
    setShowModalFeedback(!showModalFeedback);
  };

  const Orders = [
    {
      id: 10000001,
      orderDetail: [
        {
          id: 1,
          image:
            "http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/ca_basa_huu_co_binca_cat_lat_master.jpg",
          name: "Cá Basa cắt lát hữu cơ Binca hộp 270g",
          price: 75000,
          percentageDiscount: 0.2,
          quantity: 4,
          total: 300000,
        },
        {
          id: 2,
          image:
            "http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/tom_su_huu_co_binca_3_master.jpg",
          name: "Tôm sú hữu cơ Binca size đặc biệt XL hộp 250g",
          price: 181000,
          percentageDiscount: 0.15,
          quantity: 5,
          total: 905000,
        },
        {
          id: 3,
          image:
            "http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_021f1d5bfb6043009170a1f950ecea5a_master-300x300.jpg",
          name: "	Xoài cát Hòa Lộc Global GAP loại đặc biệt",
          price: 140000,
          percentageDiscount: 0,
          quantity: 2,
          total: 280000,
        },
      ],
      orderTotal: 9999999,
      status: "Chờ xác nhận",
      paymentStatus: "Chưa thanh toán",
      paymentMethod: "Thanh toán tiền mặt khi nhận hàng",
      deliveryAddress: {
        name: "Phúc Tóc Dài",
        phone: "01234456789",
        province: "TP.Hồ Chí Minh",
        district: "Quận 9",
        ward: "Phường Tăng Nhơn Phú A",
        note: "97 Man Thiện",
      },
      createdDate: "15/04/2023",
    },
    {
      id: 10000002,
      orderDetail: [
        {
          id: 1,
          image:
            "http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/ca_basa_huu_co_binca_cat_lat_master.jpg",
          name: "Cá Basa cắt lát hữu cơ Binca hộp 270g",
          price: 75000,
          percentageDiscount: 0.1,
          quantity: 4,
          total: 300000,
        },
        {
          id: 2,
          image:
            "http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/tom_su_huu_co_binca_3_master.jpg",
          name: "Tôm sú hữu cơ Binca size đặc biệt XL hộp 250g",
          price: 181000,
          percentageDiscount: 0,
          quantity: 5,
          total: 905000,
        },
        {
          id: 3,
          image:
            "http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_021f1d5bfb6043009170a1f950ecea5a_master-300x300.jpg",
          name: "	Xoài cát Hòa Lộc Global GAP loại đặc biệt",
          price: 140000,
          percentageDiscount: 0.35,
          quantity: 2,
          total: 280000,
        },
      ],
      orderTotal: 55555555,
      status: "Đang giao",
      paymentStatus: "Đã thanh toán",
      paymentMethod: "Thanh toán chuyển khoảng qua ngân hàng",
      deliveryAddress: {
        name: "Phúc Tóc Dài",
        phone: "01234456789",
        province: "TP.Hồ Chí Minh",
        district: "Quận 9",
        ward: "Phường Tăng Nhơn Phú A",
        note: "97 Man Thiện",
      },
      createdDate: "14/04/2023",
    },
  ];

  return (
    <div className="w-full h-full px-[30px]">
      <div className="rounded-[8px] bg-[white] flex items-center justify-around py-3 ">
        <div
          onClick={() => setTab(0)}
          className={`${styles.tab} ${tab === 0 ? `${styles.tabActive}` : ""}`}
        >
          Tất cả
        </div>
        <div
          onClick={() => setTab(1)}
          className={`${styles.tab} ${tab === 1 ? `${styles.tabActive}` : ""}`}
        >
          Chờ xác nhận
        </div>
        <div
          onClick={() => setTab(2)}
          className={`${styles.tab} ${tab === 2 ? `${styles.tabActive}` : ""}`}
        >
          Đã xác nhận
        </div>
        <div
          onClick={() => setTab(3)}
          className={`${styles.tab} ${tab === 3 ? `${styles.tabActive}` : ""}`}
        >
          Đang giao
        </div>
        <div
          onClick={() => setTab(4)}
          className={`${styles.tab} ${tab === 4 ? `${styles.tabActive}` : ""}`}
        >
          Đã giao
        </div>
        <div
          onClick={() => setTab(5)}
          className={`${styles.tab} ${tab === 5 ? `${styles.tabActive}` : ""}`}
        >
          Đã huỷ
        </div>
        <div
          onClick={() => setTab(6)}
          className={`${styles.tab} ${tab === 6 ? `${styles.tabActive}` : ""}`}
        >
          Trả hàng
        </div>
      </div>
      <div className="rounded-[8px] bg-[white] py-2 flex my-[20px]">
        <div className="relative flex gap-x-2 items-center text-black w-[70%] basis-[70%] px-[20px] py-[10px] border-r-[1px] border-[#ececec] ">
          <IconSearch />
          <input
            type="search"
            placeholder="Nhập mã đơn hàng cần tìm"
            className=" w-full focus:outline-none placeholder:text-sm bg-transparent"
          />
        </div>
        <div className="relative flex text-center items-center justify-center w-[30%] basis-[30%] text-black px-[5px] ">
          <p className="w-[50%]">Sắp xếp theo</p>
          <select
            className="outline-none w-[50%] h-full px-[20px] bg-transparent"
            id=""
          >
            <option value="new">Mới nhất</option>
            <option value="old">Cũ nhất</option>
          </select>
        </div>
      </div>
      {Orders.map((order, index) => (
        <div
          onClick={() => setOrderDropdown(index)}
          className=" w-full mb-[20px] cursor-pointer"
          key={order.id}
        >
          <div className="rounded-lg ">
            <div className="rounded-t-lg flex items-center justify-between bg-primary py-4">
              <div className="mx-5 text-white">
                <div className="text-[21px] font-[500]">
                  Mã đơn hàng: #{order.id}
                </div>
                <div className="text-base">Thời gian đặt hàng: 23/04/2023</div>
              </div>
              <div className="flex ">
                <div className="rounded-[5px] flex text-center items-center justify-center mx-[10px] p-[10px] h-[20px] min-w-[100px] bg-white text-[#6abd45] font-[500] text-[15px]">
                  <div className="">{order.status}</div>
                </div>
                <div className="rounded-[5px] flex items-center justify-center  text-center text-[black] font-[500] text-[15px] mx-[10px] p-[10px] h-[20px] min-w-[150px] bg-white ">
                  <div>{order.paymentStatus}</div>
                </div>
              </div>
            </div>
            <div className={" px-[20px] bg-white "}>
              {index === orderDropdown
                ? order.orderDetail.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center w-full h-[120px] bg-white border-b-[1px] border-[#ececec] last:border-0"
                    >
                      <div className=" max-w-[15%] basis-[15%] flex items-center justify-center">
                        <img src={item.image} className="w-[80%] h-auto" />
                      </div>
                      <div className=" max-w-[60%] basis-[60%] items-center">
                        <div className="">{item.name}</div>
                        <div className="font-[500]">x{item.quantity}</div>
                        {/* <div className="text-[#6abd45] font-[450]">
                          {formatCurrency(item.price)}
                        </div> */}

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
                                item.price -
                                  item.price * item.percentageDiscount,
                              )}
                            </p>
                            <p className="text-sm text-[#0000008a] font-normal line-through">
                              {formatCurrency(item.price)}
                            </p>
                          </React.Fragment>
                        )}
                      </div>
                      <div className=" max-w-[25%] basis-[25%] flex justify-center items-center text-center">
                        <div className="bg-[#6abd45] hover:bg-[#61b13f] text-[15px] flex justify-center items-center text-white  min-h-[30px] w-[70%] rounded-[5px]">
                          <button
                            onClick={() =>
                              setShowModalFeedback(!showModalFeedback)
                            }
                          >
                            Đánh giá sản phẩm
                          </button>
                        </div>
                        {showModalFeedback && (
                          <ModalFeedback close={handleCloseModalFeedback} />
                        )}
                      </div>
                    </div>
                  ))
                : ""}
            </div>

            <div className=" px-[20px] flex items-center text-white justify-between rounded-b-[8px] bg-[#6abd45] h-[40px] w-full">
              <div className="">
                {index === orderDropdown ? (
                  <div
                    onClick={handleClose}
                    className="hover:scale-[110%] flex justify-center items-center text-[white]"
                  >
                    Chi tiết đơn hàng
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className=" flex justify-end items-center ">
                {order.status === "Chờ xác nhận" ? (
                  <div className="flex justify-center items-center mr-[20px] rounded-[8px] w-[90px] h-[25px] bg-[white] text-[#6abd45] hover:text-white hover:bg-[#d26e4b]">
                    Huỷ đơn
                  </div>
                ) : (
                  ""
                )}

                <div className="text-[15px] font-[450] mr-[5px]">
                  Tổng đơn hàng:{" "}
                </div>
                <div className="text-[21px] font-[500]">
                  {formatCurrency(order.orderTotal)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showMoreOder && (
        <MoreOderInfor order={Orders[orderDropdown]} close={handleClose} />
      )}
    </div>
  );
}
