import {
    IconDashboard,
    IconProduct,
    IconCategory,
    IconCustomer,
    IconOrder,
    IconSetting,
    IconStaff,
} from "../components/icon";

const navigation = [
    {
        title: "Tổng quan",
        path: "",
        icon: IconDashboard,
    },
    {
        title: "Sản phẩm",
        path: "/products",
        icon: IconProduct,
    },
    {
        title: "Danh mục",
        path: "/category",
        icon: IconCategory,
    },
    {
        title: "Khách hàng",
        path: "/customers",
        icon: IconCustomer,
    },
    {
        title: "Đơn hàng",
        path: "/orders",
        icon: IconOrder,
    },
    {
        title: "Nhân viên",
        path: "/staffs",
        icon: IconStaff,
    },
    {
        title: "Cài đặt",
        path: "/setting",
        icon: IconSetting,
    },
];

export default navigation;
