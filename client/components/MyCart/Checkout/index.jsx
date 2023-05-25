import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconClose } from "@/components/icons";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteManyItemInCart } from "@/features/cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import calculateItemTotal from "@/utils/calculateItemTotal";
import Swal from "sweetalert2";
import formatCurrency from "@/utils/formatCurrency";
import yup from "@/utils/yupGlobal";
import addressAPI from "@/api/addressAPI";
import orderAPI from "@/api/orderAPI";
import jsUcfirst from "@/utils/jsUcfirst";
import Loading from "@/components/loading";
import styles from "./styles.module.css";

export default function Checkout({ purchase, close }) {
  console.log(purchase);
  const router = useRouter();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [districtCode, setDistrictCode] = useState(null);
  const [provinceCode, setProvinceCode] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const total = purchase.reduce(
    (total, item) => total + calculateItemTotal(item?.product, item?.quantity),
    0,
  );

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại của bạn")
      .phone("Vui lòng nhập đúng số điện thoại của bạn"),
    province: yup.string().required("Vui lòng chọn tỉnh thành"),
    district: yup.string().required("Vui lòng chọn quận, huyện"),
    ward: yup.string().required("Vui lòng chọn xã, phường thị trấn"),
    addressDetail: yup.string().required("Vui lòng nhập địa chỉ của thể"),
    note: yup.string(),
  });

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const orderDetail = purchase.map((item) => {
      return {
        product: item.product._id,
        name: item.product.name,
        thumbnail: item.product.thumbnail,
        price: item.product.price,
        percentageDiscount: item.product.percentageDiscount,
        quantity: item.quantity,
        total: calculateItemTotal(item.product, item.quantity),
      };
    });
    const deliveryAddress = {
      name: data.name,
      phone: data.phone,
      province: data.province,
      district: data.district,
      ward: data.ward,
      addressDetail: data.addressDetail,
      note: data.note,
    };
    const orderData = {
      orderDetail,
      orderTotal: total,
      deliveryAddress,
      paymentMethod,
    };
    const itemCartIdsToDelte = purchase.map((item) => item._id);

    try {
      setIsLoading(true);
      await orderAPI.createOrder(orderData);
      unwrapResult(await dispatch(deleteManyItemInCart(itemCartIdsToDelte)));
      close();
      router.push("/shop");
      Swal.fire({
        icon: "success",
        title: "Đặt hàng thành công.",
        text: "Bạn sẽ đưa lại cửa hàng để tiếp tục mua sắm",
        confirmButtonColor: "#6abd45",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllProvinces = async () => {
    try {
      const response = await addressAPI.getAllProvinces();
      setProvinces(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllDistricts = async (province_code) => {
    try {
      const response = await addressAPI.getAllDistricts({ province_code });
      setDistricts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllWards = async (district_code) => {
    try {
      const response = await addressAPI.getAllWards({ district_code });
      setWards(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllProvinces();
  }, []);

  useEffect(() => {
    getAllDistricts(provinceCode);
  }, [provinceCode]);

  useEffect(() => {
    getAllWards(districtCode);
  }, [districtCode]);

  const paymentMethods = [
    {
      id: 1,
      title: "Trả tiền mặt khi nhận hàng",
      description: "Trả tiền mặt khi giao hàng.",
    },
    {
      id: 2,
      title: "Chuyển khoản ngân hàng",
      description:
        "Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.",
    },
  ];

  return (
    <React.Fragment>
      <div
        onClick={close}
        className="bg-black/30 top-0 right-0 left-0 bottom-0 fixed w-full h-full"
      ></div>

      <div
        className={`  h-[85%] mt-[40px] px-[10px] rounded-[8px] z-10 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[70%] basis-[70%] min-w-[60%] bg-white`}
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
          <div className="container bg-[white]  mb-[20px] p-[20px]">
            <div className="flex">
              <div className="w-[50%] basis-[50%]">
                <div className="box-border max-w-5xl w-full flex mx-auto">
                  <div className="w-full ">
                    <div className="border-t-[2px] border-[#ececec] w-full py-[20px] px-[10px]">
                      <h1 className="font-[600] text-[18px] uppercase mb-[10px]">
                        Thông tin thanh toán
                      </h1>
                      <form>
                        <div className="w-full flex">
                          <div className="mr-[10px] w-[50%] basis-[50%]">
                            <label className="font-[550]" htmlFor="name">
                              Họ Tên<span className="text-red-500">*</span>
                            </label>{" "}
                            <br />
                            <input
                              className={`${
                                errors.name ? "border-red-500" : ""
                              } ${styles.input}`}
                              id="name"
                              type="text"
                              name="name"
                              defaultValue={currentUser?.name}
                              {...register("name")}
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mb-2">{`*${errors.name.message}`}</p>
                            )}
                          </div>
                          <div className="ml-[10px] w-[50%] basis-[50%]">
                            <label className="font-[550]" htmlFor="phoneNumber">
                              Số điện thoại
                              <span className="text-red-500">*</span>
                            </label>{" "}
                            <br />
                            <input
                              className={`${
                                errors.phone ? "border-red-500" : ""
                              } ${styles.input}`}
                              id="phoneNumber"
                              type="tel"
                              name="phoneNumber"
                              defaultValue={currentUser?.phone}
                              {...register("phone")}
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-sm mb-2">{`*${errors.phone.message}`}</p>
                            )}
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="font-[550]" htmlFor="province">
                            Tỉnh/Thành phố
                            <span className="text-red-500">*</span>
                          </label>
                          <Controller
                            name="province"
                            control={control}
                            render={({ field }) => (
                              <select
                                id="province"
                                name="province"
                                className={styles.input}
                                onChange={async (e) => {
                                  const selectedOption =
                                    e.target.options[e.target.selectedIndex];
                                  const provinceCode = selectedOption.id;
                                  const province = e.target.value;
                                  field.onChange(e);
                                  await trigger("province", province);
                                  setProvinceCode(provinceCode);
                                }}
                              >
                                <option value="">Tỉnh/Thành phố</option>
                                {provinces.map((item) => (
                                  <option
                                    key={item._id}
                                    id={item.code}
                                    value={item.name}
                                  >
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            )}
                          />
                          {errors.province && (
                            <p className="text-red-500 text-sm mb-2">{`*${errors.province.message}`}</p>
                          )}
                          <br />
                          <label className="font-[550]" htmlFor="district">
                            Quận/Huyện<span className="text-red-500">*</span>
                          </label>
                          <Controller
                            name="district"
                            control={control}
                            render={({ field }) => (
                              <select
                                id="district"
                                className={styles.input}
                                onChange={async (e) => {
                                  const selectedOption =
                                    e.target.options[e.target.selectedIndex];
                                  const districtCode = selectedOption.id;
                                  const district = e.target.value;
                                  field.onChange(e);
                                  await trigger("district", district);
                                  setDistrictCode(districtCode);
                                }}
                              >
                                <option value="">Quận/Huyện</option>
                                {districts &&
                                  districts.map((item) => (
                                    <option
                                      key={item._id}
                                      id={item.code}
                                      value={item.name}
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                              </select>
                            )}
                          />
                          {errors.district && (
                            <p className="text-red-500 text-sm mb-2">{`*${errors.district.message}`}</p>
                          )}
                          <br />
                          <label className="font-[550]" htmlFor="ward">
                            Xã/Phường/Thị Trấn
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="ward"
                            className={styles.input}
                            {...register("ward")}
                          >
                            <option value="">Xã/Phường/Thị Trấn</option>
                            {wards &&
                              wards.map((item) => (
                                <option key={item._id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          {errors.ward && (
                            <p className="text-red-500 text-sm mb-2">{`*${errors.ward.message}`}</p>
                          )}
                          <br />
                          <label
                            className="font-[550]"
                            htmlFor="specificAddress"
                          >
                            Địa chỉ cụ thể
                            <span className="text-red-500">*</span>
                          </label>{" "}
                          <br />
                          <input
                            className={`${
                              errors.address ? "border-red-500" : ""
                            } ${styles.input}`}
                            type="text"
                            name="specificAddress"
                            placeholder="VD: 210, Khu 1, Ấp Nam Chánh"
                            {...register("addressDetail")}
                          />
                          {errors.addressDetail && (
                            <p className="text-red-500 text-sm mb-2">{`*${errors.addressDetail.message}`}</p>
                          )}
                        </div>
                        <label className="font-[550]" htmlFor="note">
                          Ghi chú đơn hàng (tuỳ chọn)
                        </label>
                        <br />
                        <textarea
                          className={`w-full mt-[10px] p-[10px] border-solid border-[1px] border-[#ddd] pt-[0.7em] h-[120px] focus:shadow-[#ccc] focus:shadow-md focus:outline-none`}
                          name="note"
                          id="note"
                          cols="5"
                          rows="2"
                          placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                          {...register("note")}
                        ></textarea>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-[50%] basis-[50%] w-full px-[1%]">
                <div className="w-full p-[5%] border-[2px] border-[#6abd45]">
                  <table className="w-full box-border mt-0">
                    <thead className="h-[55px] bg-[white] border-b-[3px] border-[#ececec] box-border uppercase leading-[1.05] tracking-[.05em] text-left p-[0.5em] w-[14%] text-[15px] ">
                      <tr className="border-0">
                        <td className="font-[600] uppercase text-[18px] text-left w-[55%] tracking-normal">
                          <div className="mb-[20px]">Đơn hàng của bạn</div>
                        </td>
                        <td className="text-[18px] text-center w-[20%] tracking-normal "></td>
                        <td className="text-[18px] text-right w-[20%] tracking-normal "></td>
                      </tr>
                      <tr>
                        <td className="text-left w-[55%] tracking-normal">
                          <div className="font-[500] mb-[10px]">Sản phẩm</div>
                        </td>
                        <td className="text-center w-[20%] tracking-normal ">
                          <div className="font-[500] mb-[10px]">Số lượng</div>
                        </td>
                        <td className="text-right w-[20%] tracking-normal ">
                          <div className="font-[500] mb-[10px]">Tổng</div>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {purchase.map((item, index) => (
                        <tr key={index}>
                          <td className="border-y-[1.5px] py-[8px] text-left w-[55%] tracking-normal">
                            {jsUcfirst(item?.product?.name)}
                          </td>
                          <td className="border-y-[1.5px] py-[8px] text-center w-[20%] tracking-normal whitespace-nowrap text-[#000000] font-bold text-[16px]">
                            {item?.quantity}
                          </td>
                          <td className="border-y-[1.5px] py-[8px] text-right w-[20%] tracking-normal whitespace-nowrap text-[#6abd45] font-bold text-[16px]">
                            {formatCurrency(
                              item?.quantity *
                                (item?.product?.price -
                                  item?.product?.price *
                                    item?.product?.percentageDiscount),
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-[white] border-t-[2px] border-[#ececec]">
                    <div className="border-b-[1px] border-[#ececec] flex">
                      <div className="w-[50%] p-[0.5em] items-center text-left text-[15px] font-[600]">
                        Tạm tính
                      </div>
                      <div className="w-[50%] p-[0.5em] items-center text-right text-[16px] font-bold whitespace-nowrap text-[#6abd45] ">
                        {formatCurrency(total)}
                      </div>
                    </div>
                    <div className="border-b-[1px] border-[#ececec] flex">
                      <div className="w-[50%] p-[0.5em] items-center text-left text-[15px] font-[600]">
                        Phí vận chuyển
                      </div>
                      <div className="w-[50%] p-[0.5em] items-center text-right text-[15px] font-[500] ">
                        Miễn phí
                      </div>
                    </div>
                    <div className="border-b-[1px] border-[#ececec] flex">
                      <div className="w-[50%] p-[0.5em] items-center text-left text-[17px] font-[600] ">
                        Tổng
                      </div>
                      <div className="w-[50%] p-[0.5em] items-center text-right text-[16px] font-bold whitespace-nowrap text-[#6abd45] ">
                        {formatCurrency(total)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[white] border-t-[2px] border-[#ececec] pt-[10px]">
                    <ul>
                      {paymentMethods.map((item) => (
                        <li key={item.id} className={`${styles.li} mt-[10px]`}>
                          <div className="items-center font-[550] text-[16px] flex">
                            <label className={styles.containerRadio}>
                              <input
                                checked={item.id === paymentMethod}
                                onChange={() => setPaymentMethod(item.id)}
                                className={styles.radio}
                                type="radio"
                              />
                              <span className={styles.checkmark}></span>
                            </label>
                            <label>{item.title}</label>
                          </div>

                          {paymentMethod === item.id ? (
                            <div className="items-center font-[450] py-[10px] px-[20px] text-[15px] flex">
                              <p>{item.description}</p>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-[20px] border-t-[3px] border-[#ececec] pt-[20px]">
                    <button
                      disabled={isLoading}
                      onClick={handleSubmit(onSubmit)}
                      className={`bg-[#ee4d2d] text-[white] min-h-[40px] w-full flex items-center text-center justify-center uppercase hover:bg-[#a8583c] ${
                        isLoading ? "cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex justify-center items-center fill-current">
                          <Loading />
                        </div>
                      ) : (
                        "Đặt Hàng"
                      )}
                    </button>
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
