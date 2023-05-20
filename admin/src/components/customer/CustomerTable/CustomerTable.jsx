import { Link } from "react-router-dom";

import { Tooltip } from "react-tooltip";
import { IconView } from "../../icon";
import DataTable from "../../DataTable";
import formatTimestamp from "../../../utils/formatTimestamp";

export default function CustomerTable({
  customers,
  currentPage,
  setCurrentPage,
  totalPageCount,
  limitPerPage,
  setLimitPerPage,
}) {
  const columnData = [
    {
      field: "name",
      headerName: "Họ tên khách hàng",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <div className="w-[50px] h-[50px] ring-1 ring-gray-300">
              <img src={item.photo} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm">{item.name}</p>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (item) => {
        return <span className="text-sm">{item.email}</span>;
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
      field: "dateCreateAccount",
      headerName: "Ngày tạo tài khoản",
      renderCell: (item) => {
        return <span className="text-sm">{formatTimestamp(item.createdAt)}</span>;
      },
    },

    {
      field: "actions",
      headerName: "Xem",
      renderCell: (item) => {
        return (
          <div className=" text-gray-400 gap-x-4">
            <Link to={`/customers/${item._id}`}>
              <button
                data-tooltip-id="view"
                data-tooltip-content="Xem đơn hàng"
                className="text-gray-400 hover:text-green-600"
              >
                <IconView />
              </button>
              <Tooltip id="view" style={{ backgroundColor: "var(--color-primary" }} />
            </Link>
          </div>
        );
      },
    },
  ];
  // const rowData = [
  //   {
  //     _id: 1,
  //     name: "Võ Anh Phụng",
  //     email: "phung12@gmail.com",
  //     phone: "0796884386",
  //     avatar: "https://vapa.vn/wp-content/uploads/2022/12/anh-avatar-cute-002.jpg",
  //     dateCreateAccount: "25/04/2023",
  //   },
  // ];
  return (
    <DataTable
      columnData={columnData}
      rowData={customers}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPageCount={totalPageCount}
      limitPerPage={limitPerPage}
      setLimitPerPage={setLimitPerPage}
    />
  );
}
