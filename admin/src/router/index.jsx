import Dashboard from "../pages/dashboard";
import Product from "../pages/product";
import Category from "../pages/category";
import Customer from "../pages/customer";
import Order from "../pages/order";
import Staff from "../pages/staff";
import Setting from "../pages/setting";
import CustomerOrder from "../pages/customer/CustomerOrder/index";
import Supplier from "../pages/supplier";
import Import from "../pages/import";
import Export from "../pages/export";

const adminRouter = [
  {
    path: "",
    element: Dashboard,
  },

  {
    path: "/products",
    element: Product,
  },
  {
    path: "/category",
    element: Category,
  },
  {
    path: "/customers",
    element: Customer,
  },
  {
    path: "/customers/:id",
    element: CustomerOrder,
  },
  {
    path: "/orders",
    element: Order,
  },
  {
    path: "/staffs",
    element: Staff,
  },
  {
    path: "/setting",
    element: Setting,
  },
  {
    path: "/supplier",
    element: Supplier,
  },
  {
    path: "/import",
    element: Import,
  },
  {
    path: "/export",
    element: Export,
  },
];

const staffRouter = [
  {
    path: "",
    element: Dashboard,
  },
  {
    path: "/products",
    element: Product,
  },
  {
    path: "/category",
    element: Category,
  },
  {
    path: "/customers",
    element: Customer,
  },
  {
    path: "/customers/:id",
    element: CustomerOrder,
  },
  {
    path: "/orders",
    element: Order,
  },
  {
    path: "/setting",
    element: Setting,
  },
  {
    path: "/supplier",
    element: Supplier,
  },
  {
    path: "/import",
    element: Import,
  },
  {
    path: "/export",
    element: Export,
  },
];

export { adminRouter, staffRouter };
