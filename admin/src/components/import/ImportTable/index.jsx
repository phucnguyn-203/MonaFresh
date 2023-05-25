import { Tooltip } from "react-tooltip";
import { IconEdit } from "../../icon";
import { IconView } from "../../icon";
import DataTable from "../../DataTable";
import formatTimestamp from "../../../utils/formatTimestamp";
import jsUcfirst from "../../../utils/jsUcfirst";

export default function ImportTable({
  invoices,
  currentPage,
  setCurrentPage,
  totalPageCount,
  limitPerPage,
  setLimitPerPage,
  handleShowStaffName,
  handleShowBill,
}) {
  const columnData = [
    {
      field: "invoiveID",
      headerName: "Mã hoá đơn",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm">{item._id}</p>
          </div>
        );
      },
    },
    {
      field: "staffName",
      headerName: "Nhân viên phụ trách",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm">{handleShowStaffName(item.createdBy)}</p>
          </div>
        );
      },
    },
    {
      field: "importTime",
      headerName: "Thời gian nhập",
      renderCell: (item) => {
        return <span className="text-sm ">{formatTimestamp(item.createdAt)}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Xem",
      renderCell: (item) => {
        return (
          <div className="flex justify-start items-center text-gray-400 gap-x-4">
            {/* <button
              data-tooltip-id="edit"
              data-tooltip-content="Chỉnh sửa"
              className="hover:text-green-600"
              //   onClick={() => handleShowEditStaffModal(item)}
            >
              <IconEdit />
            </button>
            <Tooltip id="edit" style={{ backgroundColor: "var(--color-primary" }} /> */}
            <button
              data-tooltip-id="view"
              data-tooltip-content="Xem chi tiết"
              className="text-left cursor-pointer text-gray-400 hover:text-green-600"
              onClick={() => handleShowBill(item)}
            >
              <IconView />
            </button>
            <Tooltip id="view" style={{ backgroundColor: "var(--color-primary" }} />
          </div>
        );
      },
    },
  ];
  return (
    <DataTable
      columnData={columnData}
      rowData={invoices}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPageCount={totalPageCount}
      limitPerPage={limitPerPage}
      setLimitPerPage={setLimitPerPage}
      handleShowStaffName={handleShowStaffName}
    />
  );
}
