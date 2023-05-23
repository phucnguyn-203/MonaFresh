import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import React from "react";
import styles from "./styles.module.css";
import { IconSearch } from "@/components/icons";
import MoreOderInfor from "../MoreOrderInfor";
import formatCurrency from "@/utils/formatCurrency";
import ModalFeedback from "../../Product/ModalFeedback";
import orderAPI from "@/api/orderAPI";
import { ORDER_STATUS } from "@/utils/Constant";
import formatTimestamp from "@/utils/formatTimestamp";
import productAPI from "@/api/productAPI";
import Swal from "sweetalert2";

export default function MyOders() {
  const [tab, setTab] = useState(0);
  const [showMoreOder, setShowMoreOrder] = useState(false);
  const [orderDropdown, setOrderDropdown] = useState(0);
  const [showModalFeedback, setShowModalFeedback] = useState(false);
  const [orders, setOrders] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);

  const paymentStatus = ["", "Chưa thanh toán", "Đã thanh toán"];
  const paymentMethod = ["", "Thanh toán tiền mặt", "Thanh toán qua ngân hàng"];
  const status = [
    "",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao",
    "Đã giao",
    "Đã huỷ",
    "Trả hàng",
  ];
  useEffect(() => {
    getMyOrder();
  }, [filterByStatus, debounceValue, sortValue]);

  const handleCancel = async(id) => {
    await orderAPI.updateOrder(id,{"status": 5});
    getMyOrder();
  }
  const createFeedback = async(id, data) => {
    await productAPI.createFeedback(id, data);
    
  }
  const handleClose = () => {
    setShowMoreOrder(!showMoreOder);
  };
  const handleCloseModalFeedback = () => {
    setShowModalFeedback(!showModalFeedback);
  };

  const getMyOrder = async () => {
    let params = {};
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    if (filterByStatus !== "") {
      params.status = filterByStatus;
    }
    if (sortValue) {
      params = { ...params, ...sortValue };
    } else {
      params.sort = "-createdAt";
    }
    try {
      const response = await orderAPI.getMyOrder(params);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full px-[30px]">
      <div className="rounded-[8px] bg-[white] flex items-center justify-around py-3 ">
        <div
          onClick={() => {
            setOrderDropdown(0);
            setTab(0);
            setFilterByStatus("");
          }}
          className={`${styles.tab} ${tab === 0 ? `${styles.tabActive}` : ""}`}
        >
          Tất cả
        </div>
        <div
          onClick={() => {
            setOrderDropdown(0);
            setTab(1);
            setFilterByStatus(1);
          }}
          className={`${styles.tab} ${tab === 1 ? `${styles.tabActive}` : ""}`}
        >
          Chờ xác nhận
        </div>
        <div
          onClick={() => {
            setOrderDropdown(0);
            setTab(2);
            setFilterByStatus(2);
          }}
          className={`${styles.tab} ${tab === 2 ? `${styles.tabActive}` : ""}`}
        >
          Đã xác nhận
        </div>
        <div
          onClick={() => {
            setOrderDropdown(0);
            setTab(3);
            setFilterByStatus(3);
          }}
          className={`${styles.tab} ${tab === 3 ? `${styles.tabActive}` : ""}`}
        >
          Đang giao
        </div>
        <div
          onClick={() => {
            setOrderDropdown(0);
            setTab(4);
            setFilterByStatus(4);
          }}
          className={`${styles.tab} ${tab === 4 ? `${styles.tabActive}` : ""}`}
        >
          Đã giao
        </div>
        <div
          onClick={() => {
            setOrderDropdown(0);
            setTab(5);
            setFilterByStatus(5);
          }}
          className={`${styles.tab} ${tab === 5 ? `${styles.tabActive}` : ""}`}
        >
          Đã huỷ
        </div>
        <div
          onClick={() => {
            setOrderDropdown(0);
            setTab(6);
            setFilterByStatus(6);
          }}
          className={`${styles.tab} ${tab === 6 ? `${styles.tabActive}` : ""}`}
        >
          Trả hàng
        </div>
      </div>
      <div className="rounded-[8px] bg-[white] py-2 flex my-[20px]">
        <div className="relative flex gap-x-2 items-center text-black w-[70%] basis-[70%] px-[20px] py-[10px] border-r-[1px] border-[#ececec] ">
          <IconSearch />
          <input
            onChange={(e) => setSearchKeyWord(e.target.value)}
            type="text"
            placeholder="Nhập mã đơn hàng cần tìm"
            className=" w-full focus:outline-none placeholder:text-sm bg-transparent"
          />
        </div>
        <div className="relative flex text-center items-center justify-center w-[30%] basis-[30%] text-black px-[5px] ">
          <p className="w-[50%]">Sắp xếp theo</p>
          <select
            className="outline-none w-[50%] h-full px-[20px] bg-transparent"
            defaultValue={sortValue.value}
            onChange={(e) => {
              if (e.target.value) {
                setSortValue(JSON.parse(e.target.value));
              }
            }}
          >
            <option value={JSON.stringify({ sort: "-createdAt" })}>
              Mới nhất
            </option>
            <option value={JSON.stringify({ sort: "createdAt" })}>
              Cũ nhất
            </option>
          </select>
        </div>
      </div>
      {orders.map((order, index) => (
        <div
          onClick={() => setOrderDropdown(index)}
          className=" w-full mb-[20px] cursor-pointer"
          key={order.id}
        >
          <div className="rounded-lg ">
            <div className="rounded-t-lg flex items-center justify-between bg-primary py-4">
              <div className="mx-5 text-white">
                <div className="text-[21px] font-[500]">
                  Mã đơn hàng: #{order._id.slice(-10)}
                </div>
                <div className="text-base">
                  {formatTimestamp(order.createdAt)}
                </div>
              </div>
              <div className="flex ">
                <div className="rounded-[5px] flex text-center items-center justify-center mx-[10px] p-[10px] h-[20px] min-w-[100px] bg-white text-[#6abd45] font-[500] text-[15px]">
                  <div className="">{status[order.status]}</div>
                </div>
                <div className="rounded-[5px] flex items-center justify-center  text-center text-[black] font-[500] text-[15px] mx-[10px] p-[10px] h-[20px] min-w-[150px] bg-white ">
                  <div>{paymentStatus[order.paymentStatus]}</div>
                </div>
              </div>
            </div>
            <div className={" px-[20px] bg-white "}>
              { order.orderDetail.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center w-full h-[120px] bg-white border-b-[1px] border-[#ececec] last:border-0"
                    >
                      <div className=" max-w-[15%] basis-[15%] flex items-center justify-center">
                        <img
                          src={item.product.thumbnail}
                          className="w-[80%] h-auto"
                        />
                      </div>
                      <div className=" max-w-[60%] basis-[60%] items-center">
                        <div className="">{item.product.name}</div>
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
                                  item.price *
                                    item.percentageDiscount,
                              )}
                            </p>
                            <p className="text-sm text-[#0000008a] font-normal line-through">
                              {formatCurrency(item.price)}
                            </p>
                          </React.Fragment>
                        )}
                      </div>
                    
                      {order.status === 4 ? (
                        <React.Fragment>
                          {item.isFeedback 
                          ?<div className=" max-w-[25%] basis-[25%] flex justify-center items-center text-center">
                            <div className="text-[#6abd45] text-[15px] flex justify-center items-center bg-white border-[1px] border-[#6abd45] min-h-[30px] w-[70%] rounded-[5px]">
                              Đã đánh giá
                            </div>
                          </div>
                          :<div className=" max-w-[25%] basis-[25%] flex justify-center items-center text-center">
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
                            <ModalFeedback 
                              createFeedback={createFeedback}
                              _id={order._id}
                              productId={item.product._id} 
                              itemId={item._id} 
                              getMyOrder={getMyOrder}
                              close={handleCloseModalFeedback} />
                          )}
                        </div>
                        }
                        </React.Fragment>
                        
                      ) : (
                        <div className=" max-w-[25%] basis-[25%] flex justify-center items-center text-center">
                          <div className="bg-[#8eb17f]  text-[15px] flex justify-center items-center text-white  min-h-[30px] w-[70%] rounded-[5px]">
                            <button
                              className="cursor-not-allowed"
                             
                            >
                              Đánh giá sản phẩm
                            </button>
                          </div>
                          {showModalFeedback && (
                            <ModalFeedback close={handleCloseModalFeedback} />
                          )}
                        </div>
                      )}
                    </div>
                  ))
                }
            </div>

            <div className=" px-[20px] flex items-center text-white justify-between rounded-b-[8px] bg-[#9ac986] h-[40px] w-full">
              <div className="">
              
                  <div
                    onClick={handleClose}
                    className="underline hover:scale-[110%] flex justify-center items-center text-[white]"
                  >
                    Chi tiết đơn hàng
                  </div>
                
              </div>
                  
              <div className=" flex justify-end items-center ">
                {order.status === ORDER_STATUS.PENDING ? (
                  <button 
                    onClick={ () => {
                      Swal.fire({
                        title: "Bạn chắc chắn muốn huỷ?",
                        text: "Đơn hàng sẽ được huỷ và không thể khôi phục.",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#6abd45",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "Huỷ bỏ",
                        confirmButtonText: "Đồng ý!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleCancel(order._id);
                          Swal.fire({
                            title: "Đã huỷ",
                            text: "Đơn hàng đã được huỷ.",
                            confirmButtonColor: "#6abd45",
                          });
                        }
                      });
                    }}
                    className="flex justify-center items-center mr-[20px] rounded-[8px] w-[90px] h-[25px] bg-[white] text-[#6abd45] hover:text-white hover:bg-red-600"
                  >
                    Huỷ đơn
                  </button>
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
        <MoreOderInfor order={orders[orderDropdown]} close={handleClose} />
      )}
    </div>
  );
}
