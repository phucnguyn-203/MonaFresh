import styles from "@/styles/Checkout.module.css";
import { useState } from "react";
import formatCurrency from "@/utils/formatCurrency";

export default function Checkout() {
  const Product = [
    {
      id: 1,
      name: "Cá Basa cắt lát hữu cơ Binca hộp 270g",
      price: 75000,
      quantity: 4,
      total: 300000,
    },
    {
      id: 2,
      name: "Tôm sú hữu cơ Binca size đặc biệt XL hộp 250g",
      price: 181000,
      quantity: 2,
      total: 362000,
    },
    {
      id: 3,
      name: "Cam xoàn hướng hữu cơ 1kg",
      price: 65000,
      quantity: 5,
      total: 325000,
    },
    {
      id: 4,
      name: "Gà ta thả vườn Bình Định 1kg",
      price: 195000,
      quantity: 1,
      total: 195000,
    },
  ];
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
  Product.map((item) => (subtotal = subtotal + item.total));
  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  const [isChecked, setIsChecked] = useState(1);

  return (
    <div className="container bg-[white] my-32">
      <div className="py-[30px] box-border max-w-[1240px] w-full flex mx-auto">
        <div className="max-w-[60%] basis-[60%] w-full px-[1%]">
          <div className="border-t-[2px] border-[#ececec] w-full p-[3.5%]">
            <h1 className="font-[600] text-[18px] uppercase">
              Thông tin thanh toán
            </h1>
            <form action="">
              <div className="w-full flex">
                <div className="mr-[10px] w-[50%] basis-[50%]">
                  <label className="font-[550]" htmlFor="name">
                    Họ Tên *
                  </label>{" "}
                  <br />
                  <input
                    className={styles.information}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="ml-[10px] w-[50%] basis-[50%]">
                  <label className="font-[550]" htmlFor="phoneNumber">
                    Số điện thoại *
                  </label>{" "}
                  <br />
                  <input
                    className={styles.information}
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="0796884386"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="font-[550]" htmlFor="province">
                  Tỉnh/Thành phố *
                </label>
                <select
                  className={styles.information}
                  id="province"
                  placeholder=""
                >
                  <option value="TPHoChiMinh">TP.Hồ Chí Minh</option>
                  <option value="SocTrang">Sóc Trăng</option>
                  <option value="HauGiang">Hậu Giang</option>
                  <option value="TienGiang">Tiền Giang</option>
                  <option value="BinhDinh">Bình Định</option>
                </select>{" "}
                <br />
                <label className="font-[550]" htmlFor="district">
                  Quận/Huyện *
                </label>
                <select className={styles.information} id="district">
                  <option value="Quan1">Quận 1</option>
                  <option value="Quan1">Quận 2</option>
                  <option value="Quan1">Quận 3</option>
                  <option value="Quan1">Quận 4</option>
                  <option value="Quan1">Quận 5</option>
                  <option value="Quan1">Quận 6</option>
                  <option value="Quan1">Quận 7</option>
                  <option value="Quan1">Quận 8</option>
                </select>{" "}
                <br />
                <label className="font-[550]" htmlFor="ward">
                  Phường/Xã *
                </label>
                <select className={styles.information} id="ward">
                  <option value="TPHoChiMinh">TP.Hồ Chí Minh</option>
                  <option value="SocTrang">Sóc Trăng</option>
                  <option value="HauGiang">Hậu Giang</option>
                  <option value="TienGiang">Tiền Giang</option>
                  <option value="BinhDinh">Bình Định</option>
                </select>{" "}
                <br />
                <label className="font-[550]" htmlFor="specificAddress">
                  Địa chỉ cụ thể *
                </label>{" "}
                <br />
                <input
                  className={styles.information}
                  id="specificAddress"
                  type="text"
                  name="specificAddress"
                  placeholder="VD: 210, Khu 1, Ấp Nam Chánh"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-[40%] basis-[40%] w-full px-[1%]">
          <div className="w-full p-[5%] border-[2px] border-[#6abd45]">
            <table className="w-full box-border mt-0">
              <thead className="h-[55px] bg-[white] border-b-[3px] border-[#ececec] box-border uppercase leading-[1.05] tracking-[.05em] text-left p-[0.5em] w-[14%] text-[15px] ">
                <tr className="border-0">
                  <td className="text-[18px] text-left w-[55%] tracking-normal">
                    <div>Đơn hàng của bạn</div>
                  </td>
                  <td className="text-[18px] text-center w-[20%] tracking-normal "></td>
                  <td className="text-[18px] text-right w-[20%] tracking-normal "></td>
                </tr>
                <tr>
                  <td className="text-left w-[55%] tracking-normal">
                    <div>Sản phẩm</div>
                  </td>
                  <td className="text-center w-[20%] tracking-normal ">
                    <div>Số lượng</div>
                  </td>
                  <td className="text-right w-[20%] tracking-normal ">
                    <div>Tổng</div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {Product.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left w-[55%] tracking-normal">
                      {item.name}
                    </td>
                    <td className="text-center w-[20%] tracking-normal whitespace-nowrap text-[#000000] font-bold text-[16px]">
                      {item.quantity}
                    </td>
                    <td className="text-right w-[20%] tracking-normal whitespace-nowrap text-[#6abd45] font-bold text-[16px]">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-[white] border-t-[2px] border-[#ececec]">
              <div className="border-b-[1px] border-[#ececec] flex">
                <div className="w-[50%] p-[0.5em] items-center text-left text-[15px] font-[600]">
                  Tổng phụ
                </div>
                <div className="w-[50%] p-[0.5em] items-center text-right text-[16px] font-bold whitespace-nowrap text-[#6abd45] ">
                  {formatCurrency(subtotal)}
                </div>
              </div>
              <div className="border-b-[1px] border-[#ececec] flex">
                <div className="w-[50%] p-[0.5em] items-center text-left text-[15px] font-[600]">
                  Phí vận chuyển
                </div>
                <div className="w-[50%] p-[0.5em] items-center text-right text-[13px] font-[200] ">
                  Vận chuyển miễn phí
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
                      <div className="items-center font-[300] text-[13px] flex">
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
              <button className="bg-[#d26e4b] text-[white] min-h-[40px] w-full flex items-center text-center justify-center uppercase hover:bg-[#a8583c]">
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
