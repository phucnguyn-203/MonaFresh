export default function ShopPageTitle({ currentPage }) {
  return (
    <div className="flex justify-between items-center pt-[30px]">
      <div>
        <nav className="text-lg">
          <a className="text-slate-500 cursor-pointer">TRANG CHỦ</a>
          <span className="text-slate-500 text-base px-[5px] "> / </span>
          <span className="text-neutral-900 font-semibold cursor-pointer">
            {currentPage}
          </span>
        </nav>
      </div>

      <div className="flex items-center">
        <p className="mr-[20px] text-base">Hiển thị một kết quả duy nhất</p>
        <form className="border-solid border-gray-400">
          <select className="text-base border-solid border-gray-400 shadow-md  shadow-gray-300 p-[5px]">
            <option>Thứ tự mặc định</option>
            <option>Thứ tự theo mức độ phổ biến</option>
            <option>Thứ tự theo điểm đánh giá</option>
            <option>Mới nhất</option>
            <option>Thứ tự giá từ thấp đến cao</option>
            <option>Thứ tự giá từ cao đến thấp</option>
          </select>
          {/* <input type="hiden" value="1" /> */}
        </form>
      </div>
    </div>
  );
}
