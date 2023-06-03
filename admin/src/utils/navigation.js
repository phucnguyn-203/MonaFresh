import {
  IconDashboard,
  IconProduct,
  IconCategory,
  IconCustomer,
  IconOrder,
  IconSetting,
  IconStaff,
  IconSupplier,
  IconImport,
  IconExport,
  IconReport,
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
    title: "Nhập hàng",
    path: "/import",
    icon: IconImport,
  },
  // {
  //   title: "Hàng lỗi/hết hạn",
  //   path: "/export",
  //   icon: IconExport,
  // },
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
  // {
  //   title: "Báo cáo chi tiết",
  //   path: "/report",
  //   icon: IconReport,
  // },
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
  // {
  //   title: "Nhập hàng",
  //   path: "/import",
  //   icon: IconImport,
  // },
  // {
  //   title: "Xuất hàng",
  //   path: "/export",
  //   icon: IconExport,
  // },
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
