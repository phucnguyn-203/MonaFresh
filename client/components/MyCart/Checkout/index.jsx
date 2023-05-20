import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { IconClose } from "@/components/icons";
import formatCurrency from "@/utils/formatCurrency";
import { useSelector } from "react-redux";
import yup from "@/utils/yupGlobal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import addressAPI from "@/api/addressAPI";

export default function Checkout({ products, close }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [paymentData, setPaymentData] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province_code, setProvince_code] = useState(null);
  const [district_code, setDistrict_code] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại của bạn")
      .phone("Vui lòng nhập đúng số điện thoại của bạn"),
    address: yup.string().required("Vui lòng nhập địa chỉ của thể"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setPaymentData(data);
  };

  const getAllProvinces = async () => {
    try {
      const response = await addressAPI.getAllProvinces();
      getAllDistricts(response.data[0]?.code);
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
    if (province_code) {
      getAllDistricts(province_code);
    }
  }, [province_code]);

  useEffect(() => {
    if (district_code) {
      getAllWards(district_code);
    }
  }, [district_code]);
  const paymentMethod = [
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

  let subtotal = 0;
  products.map((item) => (subtotal = subtotal + item.total));
  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  const [isChecked, setIsChecked] = useState(1);

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
                          <select
                            onChange={(e) => {
                              const selectedProvinceCode = e.target.value;
                              setProvince_code(selectedProvinceCode);
                              getAllDistricts(selectedProvinceCode);
                            }}
                            className={styles.input}
                            id="province"
                            name="province"
                          >
                            <option value="">Tỉnh/Thành phố</option>
                            {provinces.map((item) => (
                              <option key={item._id} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <br />
                          <label className="font-[550]" htmlFor="district">
                            Quận/Huyện<span className="text-red-500">*</span>
                          </label>
                          <select
                            onChange={(e) => {
                              const selectedDistrictsCode = e.target.value;
                              setDistrict_code(selectedDistrictsCode);
                              getAllWards(selectedDistrictsCode);
                            }}
                            className={styles.input}
                            id="district"
                          >
                            <option>Quận/Huyện</option>
                            {districts &&
                              districts.map((item) => (
                                <option key={item._id} value={item.code}>
                                  {item.name}
                                </option>
                              ))}
                          </select>{" "}
                          <br />
                          <label className="font-[550]" htmlFor="ward">
                            Phường/Xã<span className="text-red-500">*</span>
                          </label>
                          <select className={styles.input} id="ward">
                            <option>Phường/Xã</option>
                            {wards &&
                              wards.map((item) => (
                                <option key={item._id} value={item._id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>{" "}
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
                            id="specificAddress"
                            type="text"
                            name="specificAddress"
                            placeholder="VD: 210, Khu 1, Ấp Nam Chánh"
                            {...register("address")}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm mb-2">{`*${errors.address.message}`}</p>
                          )}
                        </div>
                        <label className="font-[550]" htmlFor="note">
                          Ghi chú đơn hàng (tuỳ chọn)
                        </label>{" "}
                        <br />
                        <textarea
                          className={`w-full mt-[10px] p-[10px] border-solid border-[1px] border-[#ddd] pt-[0.7em] h-[120px] focus:shadow-[#ccc] focus:shadow-md focus:outline-none`}
                          // className={`${styles.input} pt-[0.7em] h-[120px]`}
                          name="note"
                          id="note"
                          cols="5"
                          rows="2"
                          placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
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
                      {products.map((item, index) => (
                        <tr key={index}>
                          <td className="border-y-[1.5px] py-[8px] text-left w-[55%] tracking-normal">
                            {item.name}
                          </td>
                          <td className="border-y-[1.5px] py-[8px] text-center w-[20%] tracking-normal whitespace-nowrap text-[#000000] font-bold text-[16px]">
                            {item.quantity}
                          </td>
                          <td className="border-y-[1.5px] py-[8px] text-right w-[20%] tracking-normal whitespace-nowrap text-[#6abd45] font-bold text-[16px]">
                            {formatCurrency(item.total)}
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
                        {formatCurrency(subtotal)}
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
                        {formatCurrency(total)}đ
                      </div>
                    </div>
                  </div>
                  <div className="bg-[white] border-t-[2px] border-[#ececec] pt-[10px]">
                    <ul>
                      {paymentMethod.map((item) => (
                        <li key={item.id} className={`${styles.li} mt-[10px]`}>
                          <div className="items-center font-[550] text-[16px] flex">
                            <label className={styles.containerRadio}>
                              <input
                                checked={item.id === isChecked}
                                onChange={() => setIsChecked(item.id)}
                                className={styles.radio}
                                type="radio"
                              />
                              <span className={styles.checkmark}></span>
                            </label>
                            <label>{item.title}</label>
                          </div>

                          {isChecked === item.id ? (
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
                      onClick={handleSubmit(onSubmit)}
                      className="bg-[#ee4d2d] text-[white] min-h-[40px] w-full flex items-center text-center justify-center uppercase hover:bg-[#a8583c]"
                    >
                      Tiến hành thanh toán
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
