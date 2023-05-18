import { Tooltip } from "react-tooltip";
import { IconEdit, IconDelete } from "../../icon";
import DataTable from "../../DataTable";
import Swal from "sweetalert2";
import jsUcfirst from "../../../utils/jsUcfirst";

export default function SupplierTable({
  supplier,
  handleShowEditSupplierModal,
  handleSoftDelete,
  isSelectAll,
  isSelected,
  handleSelectAll,
  handleSelected,
}) {
  const columnData = [
    {
      field: "name",
      headerName: "Tên nhà cung cấp",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm">{jsUcfirst(item.name)}</p>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Thông tin liên lạc",
      renderCell: (item) => {
        return <span className="text-sm">{item.email}</span>;
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      renderCell: (item) => {
        return <span className="text-sm">{item.address}</span>;
      },
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      renderCell: (item) => {
        return <span className="text-sm">{item.phone}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      renderCell: (item) => {
        return (
          <div className="flex items-center text-gray-400 gap-x-4">
            <button
              onClick={() => handleShowEditSupplierModal(item)}
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
                  text: "Nhà cung cấp sẽ được chuyển vào thùng rác.",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#0E9F6E",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Huỷ bỏ",
                  confirmButtonText: "Đồng ý!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleSoftDelete(item._id);
                    Swal.fire({ title: "Đã chuyển vào thùng rác", text: "Nhà cung cấp đã được chuyển vào thùng rác.", confirmButtonColor: "#0E9F6E" });
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
      rowData={supplier}
      select
      isSelectAll={isSelectAll}
      isSelected={isSelected}
      handleSelected={handleSelected}
      handleSelectAll={handleSelectAll}
    />
  );
}
