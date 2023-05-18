import React, { useState, useEffect } from "react";
import { IconClose } from "../../icon";
import { Tooltip } from "react-tooltip";
import { IconView, IconRestore, IconDelete, IconBack } from "../../icon";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import ToggleSwitch from "../../ToggleSwitch";
import Swal from "sweetalert2";
export default function ProductDeletedTable({
  products,
  handleDeleteProduct,
  handleRestoreProduct,
  isSelectAll,
  isSelected,
  handleSelectAll,
  handleSelected,
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
            <p className="text-sm">{item.name}</p>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Danh mục",
      renderCell: (item) => {
        return <span className="text-sm">{item.category?.name}</span>;
      },
    },
    {
      field: "price",
      headerName: "Giá bán",
      renderCell: (item) => {
        return <span className="text-sm font-semibold">{formatCurrency(item.price)}</span>;
      },
    },
    {
      field: "salePrice",
      headerName: "Giảm còn",
      renderCell: (item) => {
        return (
          <div className="text-sm font-semibold">
            <span>{formatCurrency(item.price - item.price * item.percentageDiscount)}</span>
            {item.percentageDiscount ? <span>{` (giảm${item.percentageDiscount * 100}%)`}</span> : null}
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      renderCell: (item) => {
        return <p className="text-center">{item.quantity}</p>;
      },
    },
    {
      field: "status",
      headerName: "Tình trạng",
      renderCell: (item) => {
        return (
          <div className="flex justify-center">
            {item.quantity > 0 ? (
              <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100">
                Còn hàng
              </span>
            ) : (
              <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-slate-100">
                Tạm hết
              </span>
            )}
          </div>
        );
      },
    },

    {
      field: "actions",
      headerName: "Thao tác",
      renderCell: (item) => {
        return (
          <div className="flex justify-center items-center text-gray-400 gap-x-4">
            <button
              onClick={() => {
                Swal.fire({
                  title: "Bạn chắc chắn muốn Khôi phục?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#0E9F6E",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Huỷ bỏ",
                  confirmButtonText: "Đồng ý!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleRestoreProduct(item._id);
                    Swal.fire({
                      title: "Đã khôi phục",
                      text: "Sản phẩm đã được khôi phục.",
                      confirmButtonColor: "#0E9F6E",
                    });
                  }
                });
              }}
              data-tooltip-id="restore"
              data-tooltip-content="Khôi phục"
              className="hover:text-primary"
            >
              <IconRestore />
            </button>
            <Tooltip id="restore" style={{ backgroundColor: "var(--color-primary" }} />
            <button
              onClick={() => {
                Swal.fire({
                  title: "Bạn chắc chắn muốn xoá?",
                  text: "Sản phẩm sẽ được xoá và không thể khôi phục",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#0E9F6E",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Huỷ bỏ",
                  confirmButtonText: "Đồng ý!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteProduct(item._id);
                    Swal.fire({ title: "Đã xoá", text: "Sản phẩm đã được xoá.", confirmButtonColor: "#0E9F6E" });
                  }
                });
              }}
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
    <DataTable
      columnData={columnData}
      rowData={products}
      select
      isSelectAll={isSelectAll}
      isSelected={isSelected}
      handleSelected={handleSelected}
      handleSelectAll={handleSelectAll}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPageCount={totalPageCount}
      limitPerPage={limitPerPage}
      setLimitPerPage={setLimitPerPage}
    />
  );
}
