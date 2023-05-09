import { Tooltip } from "react-tooltip";
import { IconView, IconEdit, IconDelete } from "../../icon";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import ToggleSwitch from "../../ToggleSwitch";
import Swal from "sweetalert2";

export default function ProductTable({ products, handleDeteletProduct, handleShowEditProduct, handleUpdateProduct }) {
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
      field: "active",
      headerName: "Hiển thị",
      renderCell: (item) => {
        return (
          <div className="flex justify-center">
            <ToggleSwitch id={item._id} isActive={item.isActive} handleIsActive={handleUpdateProduct} />
          </div>
        );
      },
    },
    {
      field: "view",
      headerName: "Xem",
      renderCell: (item) => {
        return (
          <span className="flex justify-center">
            <button
              data-tooltip-id="view"
              data-tooltip-content="Xem chi tiết"
              className="text-gray-400 hover:text-green-600"
            >
              <IconView />
            </button>
            <Tooltip id="view" style={{ backgroundColor: "var(--color-primary" }} />
          </span>
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
              onClick={() => handleShowEditProduct(item)}
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
                    handleDeteletProduct(item._id);
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

  return <DataTable columnData={columnData} rowData={products} select />;
}
