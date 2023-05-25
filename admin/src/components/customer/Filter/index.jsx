import React, { useState } from "react";
import { ORDER_STATUS } from "../../../utils/Constant";

const getCreatedAtRange = (start, end = new Date()) => ({
  "createdAt[gte]": new Date(start).setHours(0, 0, 0, 0),
  "createdAt[lt]": new Date(end).setHours(23, 59, 59, 999),
});

const inputStyles =
  "w-full border-[1px] border-solid py-[10px] px-[10px] bg-[#f4f5f7] rounded-[5px] focus:outline-none focus:bg-white";
const buttonStyles =
  "h-12 align-bottom inline-flex leading-5 items-center justify-center transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm text-white";

const orderStatusOptions = [
  { value: "", label: "Trạng thái" },
  { value: ORDER_STATUS.PENDING, label: "Chờ xác nhận" },
  { value: ORDER_STATUS.CONFIRMED, label: "Đã xác nhận" },
  { value: ORDER_STATUS.CANCELED, label: "Đã huỷ" },
  { value: ORDER_STATUS.RETURNS, label: "Đã trả hàng" },
];

const createRangeOption = (days) => {
  const startDate = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
  const endDate = new Date().setHours(23, 59, 59, 999);
  return {
    "createdAt[gte]": startDate,
    "createdAt[lte]": endDate,
  };
};

const timeOptions = [
  { value: "", label: "Thời gian" },
  { value: JSON.stringify({ sort: "-createdAt" }), label: "Mới nhất" },
  { value: JSON.stringify({ sort: "createdAt" }), label: "Cũ nhất" },
  { value: JSON.stringify(createRangeOption(3)), label: "3 ngày gần đây" },
  { value: JSON.stringify(createRangeOption(5)), label: "5 ngày gần đây" },
  { value: JSON.stringify(createRangeOption(7)), label: "7 ngày gần đây" },
  { value: JSON.stringify(createRangeOption(14)), label: "14 ngày gần đây" },
  { value: JSON.stringify(createRangeOption(30)), label: "30 ngày gần đây" },
];

const Filter = ({ filterByStatus, setFilterByStatus, sortValue, setSortValue }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterByRangeDay = () => {
    const range = getCreatedAtRange(startDate, endDate);
    setSortValue((prevState) => ({ ...prevState, ...range }));
  };

  const handleClearFilterByRangeDay = () => {
    setStartDate("");
    setEndDate("");
    setSortValue("");
  };

  return (
    <div className="w-full h-[180px] border-[1px] border-solid bg-[white] rounded-[15px] p-[20px] mb-[40px]">
      <div className="flex gap-4">
        <div className="w-1/3">
          <input className={inputStyles} placeholder="Tìm theo mã đơn hàng" />
        </div>
        <div className="w-1/3">
          <select
            className={inputStyles}
            defaultValue={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
          >
            {orderStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <select
            className={inputStyles}
            defaultValue={sortValue.value}
            onChange={(e) =>
              setSortValue((prevState) => {
                if (e.target.value) {
                  return { ...prevState, ...JSON.parse(e.target.value) };
                } else {
                  return "";
                }
              })
            }
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-4 mt-[20px] items-end">
        <div className="w-1/2">
          <label htmlFor="startDate" className="block text-[15px] mb-[5px] text-[#333]">
            Ngày bắt đầu
          </label>
          <input
            id="startDate"
            type="date"
            name="Ngày bắt đầu"
            className={inputStyles}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="endDate" className="block text-[15px] mb-[5px] text-[#333]">
            Ngày kết thúc
          </label>
          <input
            id="endDate"
            type="date"
            name="Ngày kết thúc"
            className={inputStyles}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          className={`${buttonStyles} bg-primary border border-transparent hover:bg-emerald-700`}
          onClick={handleFilterByRangeDay}
        >
          Lọc
        </button>
        <button
          className={`${buttonStyles} bg-red-500 border border-transparent hover:bg-red-700`}
          onClick={handleClearFilterByRangeDay}
        >
          Xoá
        </button>
      </div>
    </div>
  );
};

export default Filter;
