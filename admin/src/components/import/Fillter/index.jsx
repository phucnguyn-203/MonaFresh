import React, { useState } from "react";
import { IconAdd } from "../../../components/icon";
import { IconSearch } from "../../icon";
const getCreatedAtRange = (start, end = new Date()) => ({
  "createdAt[gte]": new Date(start).setHours(0, 0, 0, 0),
  "createdAt[lt]": new Date(end).setHours(23, 59, 59, 999),
});

const inputStyles =
  "w-full border-[1px] border-solid py-[10px] px-[10px] bg-[#f4f5f7] rounded-[5px] focus:outline-none focus:bg-white";
const buttonStyles =
  "h-12 align-bottom w-full leading-5  transition-colors duration-150 font-medium py-2 rounded-lg text-sm text-white";

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
  { value: JSON.stringify(createRangeOption(0)), label: "Hôm nay" },
  { value: JSON.stringify({ sort: "-createdAt" }), label: "Mới nhất" },
  { value: JSON.stringify({ sort: "createdAt" }), label: "Cũ nhất" },
  { value: JSON.stringify(createRangeOption(3)), label: "3 ngày gần đây" },
  { value: JSON.stringify(createRangeOption(5)), label: "5 ngày gần đây" },
  { value: JSON.stringify(createRangeOption(7)), label: "7 ngày gần đây" },
  { value: JSON.stringify(createRangeOption(14)), label: "14 ngày gần đây" },
  { value: JSON.stringify(createRangeOption(30)), label: "30 ngày gần đây" },
];

export default function Filter({ sortValue, setSortValue, handleShowModalImport, setSearchKeyWord }) {
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
        <div className="w-[40%]">
        <div className={ `${inputStyles} relative flex  items-center text-black px-[20px] py-[10px]`}>
          <IconSearch />
          <input
            onChange={(e) => setSearchKeyWord(e.target.value)}
            type="text"
            placeholder=" Nhập mã đơn hàng hoặc tên sản phẩm"
            className=" w-full focus:outline-none placeholder:text-sm bg-transparent"
          />
        </div>
        </div>
        <div className="w-[40%]">
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
        <div className="w-[20%] flex items-center justify-center">
          <button
            className="h-12 w-[80%] align-bottom inline-flex leading-5 items-center justify-center 
              cursor-pointer transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm 
              text-white bg-primary border border-transparent hover:bg-emerald-700 "
            onClick={handleShowModalImport}
          >
            <span className="mr-3">
              <IconAdd />
            </span>
            Nhập hàng
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-[20px] items-end">
        <div className="w-2/5">
          <label htmlFor="startDate" className="block text-[15px] mb-[5px] text-[#333]">
            Ngày bắt đầu
          </label>
          <input
            id="startDate"
            value={startDate}
            type="date"
            name="Ngày bắt đầu"
            className={inputStyles}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-2/5">
          <label htmlFor="endDate" className="block text-[15px] mb-[5px] text-[#333]">
            Ngày kết thúc
          </label>
          <input
            id="endDate"
            value={endDate}
            type="date"
            name="Ngày kết thúc"
            className={inputStyles}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="w-1/5 flex gap-1">
          <button
            className={`${buttonStyles} bg-[#2D99AE] border border-transparent hover:bg-[#0C5776]`}
            onClick={handleFilterByRangeDay}
          >
            Lọc
          </button>
          <button
            className={`${buttonStyles} bg-red-500 border border-transparent hover:bg-red-700`}
            onClick={handleClearFilterByRangeDay}
          >
            Bỏ lọc
          </button>
        </div>
      </div>
    </div>
  );
}
