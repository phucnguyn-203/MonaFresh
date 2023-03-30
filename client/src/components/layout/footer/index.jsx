import styles from "./styles.module.css";
import {
  IconFacebook,
  IconInstagram,
  IconAddress,
  IconEmail,
  IconPhone,
} from "../../icons";

export default function Footer() {
  return (
    <footer className={`${styles.footer} bg-[#353535] text-white mt-[30px]`}>
      <div className={`${styles.container} py-[80px] gap-x-6`}>
        <div className="w-1/4 ">
          {/* contact */}
          <div className="px-[15px] w-[270px] h-[51px] text-xl">MONAFRESH</div>
          <div className="px-[15px]">
            <ul>
              <li className="flex items-center py-[6px]">
                <div className="flex min-h-[30px] justify-start">
                  <IconAddress />
                </div>
                <p className="text-gray-400 ml-[10px] hover:text-[#6abd45] cursor-pointer">
                  11 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP.HCM
                </p>
              </li>
              <li className="flex items-center py-[6px]">
                <IconPhone />
                <p className="text-gray-400 ml-[10px] hover:text-[#6abd45] cursor-pointer">
                  0561234789
                </p>
              </li>
              <li className="flex items-center py-[6px]">
                <IconEmail />
                <p className="text-gray-400 ml-[10px] hover:text-[#6abd45] cursor-pointer">
                  nhom9@gmail.com
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/6 ">
          <div className="mb-[15px] min-h-[36px] px-[15px]">
            <h1 className="text-xl font-semibold ">SẢN PHẨM</h1>
          </div>
          <div className="px-[15px]">
            <ul className={`text-gray-400 ${styles.list}`}>
              <li>
                <a>Rau củ</a>
              </li>
              <li>
                <a>Hải sản</a>
              </li>
              <li>
                <a>Đồ uống</a>
              </li>
              <li>
                <a>Trái cây</a>
              </li>
              <li>
                <a>Thịt trứng</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/6 ">
          <div className="mb-[15px] min-h-[36px] px-[15px]">
            <h1 className="text-xl font-semibold">DANH MỤC</h1>
          </div>
          <div className="px-[15px]">
            <ul className={`text-gray-400 ${styles.list}`}>
              <li>
                <a>Trang chủ</a>
              </li>
              <li>
                <a>Giới thiệu</a>
              </li>
              <li>
                <a>Cửa hàng</a>
              </li>
              <li>
                <a>Kiến thức</a>
              </li>
              <li>
                <a>Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/6 ">
          <div className="mb-[15px] min-h-[36px] px-[15px]">
            <h1 className="text-xl font-semibold">DỊCH VỤ</h1>
          </div>
          <div className="px-[15px]">
            <ul className={`text-gray-400 ${styles.list}`}>
              <li>
                <a>Rau củ</a>
              </li>
              <li>
                <a>Hải sản</a>
              </li>
              <li>
                <a>Đồ uống</a>
              </li>
              <li>
                <a>Trái cây</a>
              </li>
              <li>
                <a>Thịt trứng</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/4 ">
          <div className="mb-[15px] min-h-[36px] px-[15px]">
            <h1 className="text-xl font-semibold">ĐĂNG KÝ</h1>
          </div>
          <div className="text-[#A4A4A4A4] px-[15px]">
            <p className="py-[6px]">
              Đăng ký để nhận được được thông tin mới nhất từ chúng tôi.
            </p>
            <input
              type="text"
              placeholder="Email"
              className="my-[6px] w-full p-[8px] rounded-md border-0 outline-none text-black"
            />
            <div className="flex w-full pt-[10px] ">
              <div className="mr-[10px] w-[30px] h-[30px]">
                <IconFacebook />
              </div>
              <div className="mx-[10px] w-[30px] h-[30px]">
                <IconInstagram />
              </div>
            </div>
            <ul></ul>
          </div>
        </div>
      </div>
      <div>
        <p className="text-center bg-[#000000] py-[15px] text-[#FFFFFF80]">
          Bản quyền website thuộc nhóm 9 D21CQAT01-N
        </p>
      </div>
    </footer>
  );
}
