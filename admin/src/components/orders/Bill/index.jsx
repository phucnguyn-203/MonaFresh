import React from "react";

import { IconClose } from "../../icon";
import DataTable from "../../DataTable";
import formatCurrency from "../../../utils/formatCurrency";
import BillTable from "../BillTable";
import styles from "./styles.module.css";

export default function Bill({ close, data }) {
    const columnData = [
        {
            field: "product",
            headerName: "Sản phẩm",
            renderCell: (item) => {
                return (
                    <div className="flex gap-x-2 items-center">
                        <p className="text-sm ">{item.orderDetail[0].product}</p>
                    </div>
                );
            },
        },
        {
            field: "amount",
            headerName: "Số lượng",
            renderCell: (item) => {
                return (
                    <div className="text-sm ">
                        <span>{item.amount}</span>
                    </div>
                );
            },
        },
        {
            field: "percentDiscount",
            headerName: "Khuyến mãi",
            renderCell: (item) => {
                return (
                    <div className="text-sm ">
                        <span>{item.percentDiscount}%</span>
                    </div>
                );
            },
        },
        {
            field: "price",
            headerName: "Giá",
            renderCell: (item) => {
                return (
                    <div className="text-sm ">
                        <span>{formatCurrency(item.price * (1 - item.percentDiscount / 100) * item.amount)}</span>
                    </div>
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
            amount: 3,
            price: 46000,
            percentDiscount: 20,
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
            amount: 7,
            price: 0,
            percentDiscount: 10,
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
            amount: 3,
            price: 50000,
            percentDiscount: 30,
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
            amount: 3,
            price: 50000,
            percentDiscount: 25,
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
    return (
        <React.Fragment>
            <div onClick={close} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
            <div
                className={`${styles.navbar} bg-white fixed w-2/3 flex flex-col h-[90%] right-1/2 top-1/2 z-50 bg-opacity-100 shadow-2xl opacity-100 translate-x-[50%] translate-y-[-50%] rounded-[10px]`}
            >
                <div className="">
                    <div className="flex">
                        <div className="w-[95%] py-[5px] px-[20px] mb-[10px]">
                            <h1 className="text-[30px] font-semibold">Thông tin hoá đơn</h1>
                        </div>
                        <div
                            onClick={close}
                            className="flex items-center w-[5%] text-left rounded-tr-[10px] bg-[#ee4d2d] text-[#fff] h-[40px] text-[25px] cursor-pointer hover:bg-[#e8340c]"
                        >
                            <IconClose />
                        </div>
                    </div>
                    <h1 className="text-[25px] px-[20px] ">Mã hoá đơn: chsdhfa78435b</h1>

                    <div className="p-[20px] flex gap-x-6 text-[16px]">
                        <div className="w-[65%] min-h-[100px] border-r-[1px] border-solid">
                            <h3>
                                Tên khách hàng: <span className="ml-[5px]">Võ Hồng Nguyên</span>
                            </h3>
                            <h3>
                                SĐT: <span className="ml-[5px]">023484113</span>
                            </h3>
                            <h3>
                                Địa chỉ:
                                <span className="ml-[5px]">Xã Mỹ Hiệp, Huyện Phù Mỹ, Tỉnh Bình Định</span>
                            </h3>
                        </div>
                        <div className="w-[35%] ">
                            <h3>Thời gian đặt: 14/04/2023</h3>
                            <h3>
                                Tình trạng: <span className="ml-[5px]">Đã giao</span>
                            </h3>
                            <h2>
                                Nhân viên phụ trách:
                                <span className="ml-[5px]">Hoàng Lan Anh</span>
                            </h2>
                        </div>
                    </div>
                    <div className="px-[20px] ">
                        <BillTable columnData={columnData} rowData={rowData} />
                    </div>
                    <div className="p-[20px] ">
                        <div className="flex gap-x-[40px] p-[20px] bg-[#F9FAFB] min-h-[55px] items-center justify-evenly">
                            <div className="w-1/3 text-left flex flex-col">
                                <h2 className="font-semibold uppercase">Phương thức</h2>
                                <span className="text-[#707275] font-semibold">Tiền mặt</span>
                            </div>
                            <div className="w-1/3 text-left">
                                <h2 className="font-semibold uppercase">Tạm tính</h2>
                                <span className="text-[#707275] ">{formatCurrency(200000000)}</span>
                            </div>
                            <div className="w-1/3 text-left">
                                <h2 className="font-semibold uppercase">Tiền vận chuyển</h2>
                                <span className="text-[#707275] ">{formatCurrency(200000)}</span>
                            </div>
                            <div className="w-1/3 text-left">
                                <h2 className="font-semibold uppercase">Tổng tiền</h2>
                                <span className="text-[red] ">{formatCurrency(200000 + 200000000)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
