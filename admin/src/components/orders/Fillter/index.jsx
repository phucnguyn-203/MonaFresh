import React from "react";
import { ORDER_STATUS } from "../../../utils/Constant";

export default function Fillter({ filterByStatus, setFilterByStatus, sortValue, setSortValue }) {
  return (
    <div className="w-full h-[180px] border-[1px] border-solid bg-[white] rounded-[15px] p-[20px] mb-[40px]">
      <form>
        <div className="flex gap-4">
          <div className="w-1/3">
            <input
              className="w-full border-[1px] border-solid py-[10px] px-[10px] bg-[#f4f5f7] rounded-[5px] focus:outline-none focus:bg-white"
              placeholder="Tìm theo mã đơn hàng"
            />
          </div>
          <div className="w-1/3">
            <select
              className="w-full border-[1px] border-solid py-[10px] px-[10px] bg-[#f4f5f7] rounded-[5px]"
              placeholder="Thời hạn"
              defaultValue={filterByStatus}
              onChange={(e) => setFilterByStatus(e.target.value)}
            >
              <option value="">Trạng thái</option>
              <option value={ORDER_STATUS.PENDING}>Chờ xác nhận</option>
              <option value={ORDER_STATUS.CONFIRMED}>Đã xác nhận</option>
              <option value={ORDER_STATUS.CANCELED}>Đã huỷ</option>
              <option value={ORDER_STATUS.RETURNS}>Đã trả hàng</option>
            </select>
          </div>
          <div className="w-1/3">
            <select
              className="w-full border-[1px] border-solid py-[10px] px-[10px] bg-[#f4f5f7] rounded-[5px]"
              placeholder="Thời hạn"
              defaultValue={sortValue.value}
              onChange={(e) => {
                if (e.target.value) {
                  setSortValue(JSON.parse(e.target.value));
                } else {
                  setSortValue("");
                }
              }}
            >
              <option value="">Thời gian</option>
              <option value={JSON.stringify({ sort: "-createdAt" })}>Mới nhất</option>
              <option value={JSON.stringify({ sort: "createdAt" })}>Cũ nhất</option>
              <option value="3">3 ngày trước</option>
              <option value="5">5 ngày trước</option>
              <option value="7">7 ngày trước</option>
            </select>
          </div>
        </div>
        <div className="flex gap-10 mt-[20px]">
          <div className="w-1/2">
            <label className="block text-[15px] mb-[5px] text-[#333]">Ngày bắt đầu</label>

            <input
              type="date"
              name="Ngày bắt đầu"
              className="w-full border-[1px] border-solid py-[10px] px-[10px] bg-[#f4f5f7] rounded-[5px] focus:outline-none focus:bg-white"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-[15px] mb-[5px] text-[#333]">Ngày kết thúc</label>
            <input
              type="date"
              name="Ngày kết thúc"
              className="w-full border-[1px] border-solid py-[10px] px-[10px] bg-[#f4f5f7] rounded-[5px] focus:outline-none focus:bg-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
