import { Tooltip } from "react-tooltip";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IconDelete } from "../../icon";
import DataTable from "../../DataTable";
import jsUcfirst from "../../../utils/jsUcfirst";
import formatCurrency from "../../../utils/formatCurrency";
import yup from "../../../utils/yupGlobal";

export default function ImportModalTable({
  currentPage,
  setCurrentPage,
  totalPageCount,
  limitPerPage,
  setLimitPerPage,
  products,
  setNewQuantity,
  handleDelete,
  handleSubmit,
  onSubmit,
}) {
  // const { handleSubmit } = useForm();
  const columnData = [
    {
      field: "name",
      headerName: "Tên hàng hoá",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm">{jsUcfirst(item.product.name)}</p>
          </div>
        );
      },
    },
    {
      field: "importPrice",
      headerName: "Giá nhập",
      customClassName: "text-center",
      renderCell: (item) => {
        return <p className="text-sm font-semibold text-center">{formatCurrency(item.product.importPrice)}</p>;
      },
    },
    {
      field: "newQuantity",
      headerName: "Số lượng cần nhập",
      renderCell: (item) => {
        return (
          <input
            onChange={(e) => setNewQuantity(item._id, e.target.value)}
            className="text-center w-[80px]"
            type="number"
            min={1}
            defaultValue={1}
          />
        );
      },
    },
    {
      field: "total",
      headerName: "Tổng tiền",
      customClassName: "text-center",
      renderCell: (item) => {
        return (
          <p className="text-sm font-semibold text-center">
            {formatCurrency(item.product.importPrice * item.quantity)}
          </p>
        );
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      renderCell: (item) => {
        return (
          <div className="flex items-center text-gray-400 gap-x-4">
            <button
              onClick={() => handleDelete(item._id)}
              data-tooltip-id="delete"
              data-tooltip-content="Xoá"
              className="hover:text-red-600"
            >
              <IconDelete />
            </button>
            <Tooltip id="delete" style={{ backgroundColor: "#EF4444" }} />
          </div>
        );
      },
    },
  ];

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <DataTable
    //     columnData={columnData}
    //     rowData={products}
    //     currentPage={currentPage}
    //     setCurrentPage={setCurrentPage}
    //     totalPageCount={totalPageCount}
    //     limitPerPage={limitPerPage}
    //     setLimitPerPage={setLimitPerPage}
    //   />
    //   <button
    //     className="bg-primary text-white h-[48px] w-[250px] text-lg font-semibold rounded-md text-center flex justify-center items-center"
    //     type="submit"
    //   >
    //     GỬI
    //   </button>
    // </form>
    <DataTable
      columnData={columnData}
      rowData={products}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPageCount={totalPageCount}
      limitPerPage={limitPerPage}
      setLimitPerPage={setLimitPerPage}
    />
  );
}
