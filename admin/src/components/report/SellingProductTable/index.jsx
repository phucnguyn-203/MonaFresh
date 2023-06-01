import { Tooltip } from "react-tooltip";
import { IconEdit, IconDelete } from "../../icon";
import jsUcfirst from "../../../utils/jsUcfirst";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import formatTimestamp from "../../../utils/formatTimestamp";
import Swal from "sweetalert2";

export default function SellingProductTable({
  currentPage,
  setCurrentPage,
  totalPageCount,
  limitPerPage,
  setLimitPerPage,
}) {
  const columnData = [
    {
      field: "name",
      headerName: "Tên sản phẩm",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <div className="w-[50px] h-[50px] ring-1 ring-gray-300">
              <img src={item.thumbnail} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm">{jsUcfirst(item.name)}</p>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Danh mục",
      renderCell: (item) => {
        return <p className="text-sm">{jsUcfirst(item.category)}</p>;
      },
    },
    {
      field: "quantity",
      headerName: "Số lượng đã bán",
      renderCell: (item) => {
        return <p className="text-left ml-[5px]">{item.quantity}</p>;
      },
    },
    {
      field: "price",
      headerName: "Giá bán",
      customClassName: "text-center",
      renderCell: (item) => {
        return <p className="text-sm font-semibold text-center">{formatCurrency(item.price)}</p>;
      },
    },
  ];
  const rowData = [
    {
      name: "Mít",
      category: "Trái cây",
      price: 20000,
      quantity: 20,
      status: "Còn hàng",
      thumbnail: "http://res.cloudinary.com/dp6iurtza/image/upload/v1684833869/etdzllxexvcdyh5a1wps.png",
    },
    {
      name: "Thịt bò",
      category: "Thịt",
      price: 20000,
      quantity: 20,
      status: "Còn hàng",
      thumbnail: "http://res.cloudinary.com/dp6iurtza/image/upload/v1684833869/etdzllxexvcdyh5a1wps.png",
    },
  ];

  return (
    <DataTable
      columnData={columnData}
      rowData={rowData}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPageCount={totalPageCount}
      limitPerPage={limitPerPage}
      setLimitPerPage={setLimitPerPage}
    />
  );
}
