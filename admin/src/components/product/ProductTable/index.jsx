import { Tooltip } from "react-tooltip";
import { IconEdit, IconDelete } from "../../icon";
import jsUcfirst from "../../../utils/jsUcfirst";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import formatTimestamp from "../../../utils/formatTimestamp";
import Swal from "sweetalert2";

export default function ProductTable({
  products,
  handleSoftDelete,
  handleShowEditProduct,
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
            <p className="text-sm">{jsUcfirst(item.name)}</p>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Danh mục",
      renderCell: (item) => {
        return <p className="text-sm">{jsUcfirst(item.category?.name)}</p>;
      },
    },
    // {
    //   field: "supplier",
    //   headerName: "Nhà cung cấp",
    //   renderCell: (item) => {
    //     return <p className="text-sm">{item.supplier?.name}</p>;
    //   },
    // },
    {
      field: "importPrice",
      headerName: "Giá nhập",
      customClassName: "text-center",
      renderCell: (item) => {
        return <p className="text-sm font-semibold text-center">{formatCurrency(item.importPrice)}</p>;
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
    {
      field: "salePrice",
      headerName: "Giảm còn",
      renderCell: (item) => {
        return (
          <div className="text-sm font-semibold">
            <span>{formatCurrency(item.price - item.price * item.percentageDiscount)}</span>
            {item.percentageDiscount ? <span>{` (giảm ${item.percentageDiscount * 100}%)`}</span> : null}
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
      field: "createdAt",
      headerName: "Ngày thêm",
      customClassName: "text-center",
      renderCell: (item) => {
        return <p className="text-sm">{formatTimestamp(item.createdAt)}</p>;
      },
    },
    {
      field: "updatedAt",
      headerName: "Ngày sửa đổi",
      customClassName: "text-center",
      renderCell: (item) => {
        return <p className="text-sm">{formatTimestamp(item.updatedAt)}</p>;
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
                handleShowEditProduct(item);
              }}
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
                  text: "Sản phẩm sẽ được chuyển vào thùng rác.",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#0E9F6E",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Huỷ bỏ",
                  confirmButtonText: "Đồng ý!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleSoftDelete(item._id);
                    Swal.fire({
                      title: "Đã chuyển vào thùng rác",
                      text: "Sản phẩm đã được chuyển vào thùng rác.",
                      confirmButtonColor: "#0E9F6E",
                    });
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
