import styles from "./style.module.css";

export default function ProductItem({ title, cost, url }) {
  return (
    <div
      className={`flex flex-col items-center min-h-[210px] max-h-[350px] w-full hover:shadow-lg hover:shadow-gray-400 ${styles.scaleImg}`}
    >
      <div className=" truncate w-full h-[210px] ">
        <img
          className="truncate hover:scale-125 duration-500 cursor-pointer"
          src={url}
        />
      </div>
      <div className="text-center w-full border-gray-200 border-x-[1px] border-b-[3px]  border-solid">
        <div className="text-[#1C1C1C] hover:text-[#6abd45] font-semibold my-[10px]">
          {title}
        </div>

        <div className="text-[#6abd45] mb-[10px]">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(cost)}
        </div>
        <div>
          <button className="bg-[#6abd45] text-white h-[30px] w-[116px] text-xs hover:bg-lime-600 rounded-md mb-[20px]">
            THÊM VÀO GIỎ
          </button>
        </div>
      </div>
    </div>
  );
}
//className={`flex flex-col items-center min-h-[210px] max-h-[350px] w-full border-gray-100 border border-solid shadow-md hover:shadow-2xl mx-[5px]  ${styles.scaleImg}`}
