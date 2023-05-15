import React, {useState,useEffect} from "react";
import { Tooltip } from "react-tooltip";
import { IconRestore, IconDelete, IconBack } from "../../icon";
import DataTable from "../../DataTable";
import ToggleSwitch from "../../ToggleSwitch";
import jsUcfirst from "../../../utils/jsUcfirst";
import formatTimestamp from "../../../utils/formatTimestamp";
import Swal from "sweetalert2";

export default function CategoryDeletedTable({
  categories,
  handleDeleteCategory,
  handleRestoreCategory,
  isSelectAll,
  isSelected,
  handleSelectAll,
  handleSelected,
}) {
  const columnData = [
    {
      field: "name",
      headerName: "Tên danh mục",
      customClassName: "text-center",
      renderCell: (item) => {
        return <p className="text-sm text-center">{jsUcfirst(item.name)}</p>;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày thêm",
      customClassName: "text-center",
      renderCell: (item) => {
        return <p className="text-sm text-center">{formatTimestamp(item.createdAt)}</p>;
      },
    },
    {
      field: "updatedAt",
      headerName: "Ngày sửa đổi",
      customClassName: "text-center",
      renderCell: (item) => {
        return <p className="text-sm text-center">{formatTimestamp(item.updatedAt)}</p>;
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      customClassName: "text-center",
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
                    handleRestoreCategory(item._id);
                    Swal.fire({
                      title: "Đã khôi phục",
                      text: "Danh Mục đã được khôi phục.",
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
            <Tooltip id="edit" style={{ backgroundColor: "var(--color-primary" }} />
            <button
              onClick={() => {
                Swal.fire({
                  title: "Bạn chắc chắn muốn xoá?",
                  text: "Các sản phẩm thuộc danh mục này cũng sẽ bị xoá và sẽ không thể khôi phục",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#0E9F6E",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Huỷ bỏ",
                  confirmButtonText: "Đồng ý!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteCategory(item._id);
                    Swal.fire({ title: "Đã xoá", text: "Danh mục đã xoá.", confirmButtonColor: "#0E9F6E" });
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
      rowData={categories}
      select
      isSelectAll={isSelectAll}
      isSelected={isSelected}
      handleSelected={handleSelected}
      handleSelectAll={handleSelectAll}
    />
  );
}