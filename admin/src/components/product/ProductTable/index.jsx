import { Tooltip } from "react-tooltip";
import { useState } from "react";

import { IconView, IconEdit, IconDelete } from "../../icon";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import ToggleSwitch from "../../ToggleSwitch";
// import EditModalProduct from "../EditModalProduct";

export default function ProductTable() {
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
                return <span className="text-sm">{item.category.name}</span>;
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
            renderCell: () => {
                return (
                    <div className="flex justify-center items-center text-gray-400 gap-x-4">
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
            id: 0,
            name: "Bắp cải tím hữu cơ 1kg",
            price: 46000,
            thumbnail:
                "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
            category: {
                id: 1,
                name: "Rau củ",
            },
            quantity: 0,
            percentageDiscount: 0,

            ratingsAverage: 4.5,
            ratingsQuantity: 15,
            isActive: true,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 1,
            name: "Bưởi năm roi",
            price: 55000,
            thumbnail:
                "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
            category: {
                id: 3,
                name: "Trái cây",
            },
            quantity: 12,
            percentageDiscount: 0.25,
            ratingsAverage: 4,
            ratingsQuantity: 20,
            isActive: false,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 2,
            name: "Gạo lứt tím hữu cơ Mùa 2kg",
            price: 189000,
            thumbnail:
                "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
            category: {
                id: 4,
                name: "Đồ khô",
            },
            quantity: 12,
            percentageDiscount: 0,
            isActive: true,
            ratingsAverage: 4.5,
            ratingsQuantity: 100,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 3,
            name: "Thăn bò Kobe",
            price: 500000,
            thumbnail:
                "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
            category: {
                id: 5,
                name: "Thịt",
            },
            quantity: 12,
            percentageDiscount: 0.2,
            isActive: true,
            ratingsAverage: 4.2,
            ratingsQuantity: 1000,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 4,
            name: "Bắp cải tím hữu cơ 1kg",
            price: 46000,
            thumbnail:
                "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
            category: {
                id: 1,
                name: "Rau củ",
            },
            quantity: 10,
            percentageDiscount: 0,
            isActive: false,
            ratingsAverage: 4.5,
            ratingsQuantity: 15,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 5,
            name: "Bưởi năm roi",
            price: 55000,
            thumbnail:
                "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
            category: {
                id: 3,
                name: "Trái cây",
            },
            quantity: 12,
            percentageDiscount: 0.25,
            isActive: true,
            ratingsAverage: 4,
            ratingsQuantity: 20,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 6,
            name: "Gạo lứt tím hữu cơ Mùa 2kg",
            price: 189000,
            thumbnail:
                "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
            category: {
                id: 4,
                name: "Đồ khô",
            },
            quantity: 12,
            percentageDiscount: 0,
            isActive: false,
            ratingsAverage: 4.5,
            ratingsQuantity: 100,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 7,
            name: "Thăn bò Kobe",
            price: 500000,
            thumbnail:
                "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
            category: {
                id: 5,
                name: "Thịt",
            },
            quantity: 12,
            percentageDiscount: 0.2,
            ratingsAverage: 4.2,
            ratingsQuantity: 1000,
            isActive: true,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
    ];
    return <DataTable columnData={columnData} rowData={rowData} select />;
}
