import { Tooltip } from "react-tooltip";
import { IconView, IconEdit, IconDelete } from "../../icon";
import DataTable from "../../DataTable";
// import formatCurrency from "../../../utils/formatCurrency";
import ToggleSwitch from "../../ToggleSwitch";

export default function CategoryTable() {
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
                        <ToggleSwitch id={item.id} isActive={item.isActive} />
                    </div>
                );
            },
        },
        {
            field: "view",
            headerName: "Xem",
            renderCell: (item) => {
                return (
                    <span className="flex justify-start">
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
            renderCell: () => {
                return (
                    <div className="flex justify-start items-center text-gray-400 gap-x-4">
                        <button
                            data-tooltip-id="edit"
                            data-tooltip-content="Chỉnh sửa"
                            className="hover:text-green-600"
                        >
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
            name: "Rau củ",
        },
    ];
    return <DataTable columnData={columnData} rowData={rowData} select />;
}
