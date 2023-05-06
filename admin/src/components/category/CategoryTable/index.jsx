import { Tooltip } from "react-tooltip";
import { IconEdit, IconDelete } from "../../icon";
import DataTable from "../../DataTable";
import ToggleSwitch from "../../ToggleSwitch";
import Swal from "sweetalert2";

export default function CategoryTable({
  categories,
  handleDeleteCategory,
  handleShowEditCategoryModal,
  handleUpdateCategory,
}) {
  const columnData = [
    {
      field: "name",
      headerName: "Tên danh mục",
      renderCell: (item) => {
        return <p className="text-sm">{item.name}</p>;
      },
    },
    {
      field: "active",
      headerName: "Hiển thị",
      renderCell: (item) => {
        return (
          <div className="flex justify-start">
            <ToggleSwitch id={item._id} isActive={item.isActive} handleIsActive={handleUpdateCategory} />
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      renderCell: (item) => {
        return <p className="text-sm">{new Date(item.createdAt).toLocaleDateString("en-GB")}</p>;
      },
    },
    {
      field: "updatedAt",
      headerName: "Ngày cập nhật",
      renderCell: (item) => {
        return <p className="text-sm">{new Date(item.updatedAt).toLocaleDateString("en-GB")}</p>;
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      renderCell: (item) => {
        return (
          <div className="flex justify-start items-center text-gray-400 gap-x-4">
            <button
              onClick={() => handleShowEditCategoryModal(item)}
              data-tooltip-id="edit"
              data-tooltip-content="Chỉnh sửa"
              className="hover:text-green-600"
            >
              <IconEdit />
            </button>
            <Tooltip id="edit" style={{ backgroundColor: "var(--color-primary" }} />
            <button
              onClick={() => {
                Swal.fire({
                  title: "Bạn chắc chắn muốn xoá?",
                  icon: "warning",
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

  return <DataTable columnData={columnData} rowData={categories} select />;
}
