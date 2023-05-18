import {
  IconDashboard,
  IconProduct,
  IconCategory,
  IconCustomer,
  IconOrder,
  IconSetting,
  IconStaff,
  IconSupplier,
} from "../components/icon";

const adminNavigation = [
  {
    title: "Tổng quan",
    path: "",
    icon: IconDashboard,
  },
  {
    title: "Danh mục",
    path: "/category",
    icon: IconCategory,
  },
  {
    title: "Sản phẩm",
    path: "/products",
    icon: IconProduct,
  },
  {
    title: "Nhà cung cấp",
    path: "/supplier",
    icon: IconSupplier,
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

const staffNavigation = [
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
    title: "Cài đặt",
    path: "/setting",
    icon: IconSetting,
  },
];

export { adminNavigation, staffNavigation };
