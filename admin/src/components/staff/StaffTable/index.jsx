import { Tooltip } from "react-tooltip";
import { IconEdit, IconDelete } from "../../icon";
import DataTable from "../../DataTable";
import ToggleSwitch from "../../ToggleSwitch";

export default function StaffTable() {
  const columnData = [
    {
      field: "name",
      headerName: "Họ tên nhân viên",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <div className="w-[50px] h-[50px] ring-1 ring-gray-300">
              <img src={item.avatar} className="w-full h-full object-cover" />
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
      field: "joinDate",
      headerName: "Ngày tham gia",
      renderCell: (item) => {
        return <span className="text-sm">{item.joinDate}</span>;
      },
    },
    {
      field: "role",
      headerName: "Chức vụ",
      renderCell: (item) => {
        return <span className="text-sm">{item.role}</span>;
      },
    },
    {
      field: "status",
      headerName: "Tình trạng",
      renderCell: (item) => {
        return (
          <div>
            {
              (item.isActive = true ? (
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100">
                  Còn làm
                </span>
              ) : (
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-slate-100">
                  Thôi làm
                </span>
              ))
            }
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
            <ToggleSwitch id={item.id} isActive={item.isActive} />
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      renderCell: () => {
        return (
          <div className="flex justify-center items-center text-gray-400 gap-x-4">
            <button data-tooltip-id="edit" data-tooltip-content="Chỉnh sửa" className="hover:text-green-600">
              <IconEdit />
            </button>
            <Tooltip id="edit" style={{ backgroundColor: "var(--color-primary" }} />
            <button data-tooltip-id="delete" data-tooltip-content="Xoá" className="hover:text-red-600">
              <IconDelete />
            </button>
            <Tooltip id="delete" style={{ backgroundColor: "#EF4444" }} />
          </div>
        );
      },
    },
  ];
  const rowData = [
    {
      _id: 1,
      name: "Võ Anh Phụng",
      email: "phung12@gmail.com",
      phone: "0796884386",
      joinDate: "25/04/2023",
      role: "Quản lý",
      avatar: "https://vapa.vn/wp-content/uploads/2022/12/anh-avatar-cute-002.jpg",
      isActive: true,
    },
  ];
  return <DataTable columnData={columnData} rowData={rowData} select />;
}
