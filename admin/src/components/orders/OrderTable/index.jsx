import { Tooltip } from "react-tooltip";
import { useState } from "react";

import { IconView, IconEdit, IconDelete } from "../../icon";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import ToggleSwitch from "../../ToggleSwitch";
import Bill from "../Bill";

export default function OrderTable() {
    const [showBill, setShowBill] = useState(false);
    const handleShowBill = () => {
        setShowBill(!showBill);
    };
    const columnData = [
        {
            field: "orderName",
            headerName: "Mã đơn hàng",
            renderCell: (item) => {
                return (
                    <div className="flex gap-x-2 items-center">
                        <p className="text-sm ">{item.OrderID}</p>
                    </div>
                );
            },
        },

        {
            field: "orderTime",
            headerName: "Thời gian đặt",
            renderCell: (item) => {
                return <span className="text-sm ">{item.time}</span>;
            },
        },
        {
            field: "customerName",
            headerName: "Tên khách hàng",
            renderCell: (item) => {
                return (
                    <div className="flex gap-x-2 items-center">
                        <p className="text-sm ">{item.customerName}</p>
                    </div>
                );
            },
        },
        {
            field: "staffName",
            headerName: "Nhân viên PT",
            renderCell: (item) => {
                return (
                    <div className="flex gap-x-2 items-center">
                        <p className="text-sm ">{item.staffName}</p>
                    </div>
                );
            },
        },
        {
            field: "method",
            headerName: "Thanh toán",
            renderCell: (item) => {
                return <span className="text-sm ">{item.payMethod}</span>;
            },
        },
        {
            field: "price",
            headerName: "Giá",
            renderCell: (item) => {
                return (
                    <div className="text-sm font-semibold ">
                        <span>{formatCurrency(item.price)}</span>
                    </div>
                );
            },
        },
        {
            field: "status",
            headerName: "Trạng thái",
            renderCell: (item) => {
                return (
                    <select className=" text-sm ">
                        <option value="" hidden>
                            Đang chờ
                        </option>
                        <option value="">Đã xác nhận</option>
                        <option value="">Đã huỷ</option>
                        <option value="">Đã trả hàng</option>
                    </select>
                );
            },
        },
        {
            field: "action",
            headerName: "Xem",
            renderCell: (item) => {
                return (
                    <span className="flex justify-center">
                        <button
                            data-tooltip-id="view"
                            data-tooltip-content="Xem chi tiết"
                            className="text-left  cursor-pointer text-gray-400 hover:text-green-600"
                            onClick={handleShowBill}
                        >
                            <IconView />
                        </button>
                        {showBill && <Bill close={handleShowBill} />}
                        {/* data={rowData.find((row) => row.OrderID)} */}
                        <Tooltip id="view" style={{ backgroundColor: "var(--color-primary" }} />
                    </span>
                );
            },
        },
    ];
    const rowData = [
        {
            OrderID: "4325gfdbdf",
            customerName: "Võ Hồng Nguyên",
            staffName: "Trần Trọng Nhân",
            time: "13/04/2005",
            payMethod: "Tiền mặt",
            price: 46000,
            // status: "Đang vận chuyển",
            shpping: 20000,
            action: "Xem",
            orderDetail: [
                {
                    product: "Sầu riêng",
                    quantity: 3,
                    total: 10000,
                },
                {
                    product: "Dưa hấu",
                    quantity: 3,
                    total: 15000,
                },
            ],
            deliveryAddress: {
                name: "Võ Hồng Nguyên",
                phone: "01234456789",
                province: "TP.Hồ Chí Minh",
                district: "Quận 9",
                ward: "Phường Tăng Nhơn Phú A",
                note: "97 Man Thiện",
            },
        },
        {
            OrderID: "fdvkljfdsvfb",
            customerName: "Nguyễn Hoàng Phúc",
            staffName: "Hoàng Lan Anh",
            time: "13/04/2005",
            payMethod: "Chuyển khoản",
            price: 0,
            // status: "Đang vận chuyển",
            shpping: 20000,
            action: "Xem",
            orderDetail: [
                {
                    product: "Cá mập",
                    quantity: 3,
                    total: 1000000,
                },
                {
                    product: "Cá heo",
                    quantity: 3,
                    total: 8000000,
                },
            ],
            deliveryAddress: {
                name: "Nguyễn Hoàng Phúc",
                phone: "01234456789",
                province: "TP.Hồ Chí Minh",
                district: "Quận 9",
                ward: "Phường Tăng Nhơn Phú A",
                note: "97 Man Thiện",
            },
        },
        {
            OrderID: "123456",
            customerName: "Võ Anh Phụng",
            staffName: "Vũ Văn Mạnh",
            time: "13/04/2005",
            payMethod: "Tiền mặt",
            price: 50000,
            // status: "Đang vận chuyển",
            shpping: 20000,
            action: "Xem",
            orderDetail: [
                {
                    product: "ổi",
                    quantity: 10,
                    total: 20000,
                },
            ],
            deliveryAddress: {
                name: "Võ Anh Phụng",
                phone: "01234456789",
                province: "TP.Hồ Chí Minh",
                district: "Quận 9",
                ward: "Phường Tăng Nhơn Phú A",
                note: "97 Man Thiện",
            },
        },
        {
            OrderID: "dfbfdbfdbgf",
            customerName: "Trần Ngọc Tân",
            staffName: "Võ Lê Bảo Ngọc",
            time: "13/04/2005",
            payMethod: "Tiền mặt",
            price: 50000,
            // status: "Đang vận chuyển",
            shpping: 20000,
            action: "Xem",
            orderDetail: [
                {
                    product: "Thịt bò",
                    quantity: 3,
                    total: 50000,
                },
            ],
            deliveryAddress: {
                name: "Trần Ngọc Tân",
                phone: "01234456789",
                province: "TP.Hồ Chí Minh",
                district: "Quận 9",
                ward: "Phường Tăng Nhơn Phú A",
                note: "97 Man Thiện",
            },
        },
    ];
    return <DataTable columnData={columnData} rowData={rowData} select />;
}
