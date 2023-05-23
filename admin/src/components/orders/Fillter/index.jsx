import React from "react";

export default function Fillter() {
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
            >
              <option value="">Trạng thái</option>
              <option value="Đang chờ">Đang chờ</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đã huỷ">Đã huỷ</option>
              <option value="Đã trả hàng">Đã trả hàng</option>
            </select>
          </div>
          <div className="w-1/3">
            <select
              className="w-full border-[1px] border-solid py-[10px] px-[10px] bg-[#f4f5f7] rounded-[5px]"
              placeholder="Thời hạn"
            >
              <option value="">Thời gian</option>
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
