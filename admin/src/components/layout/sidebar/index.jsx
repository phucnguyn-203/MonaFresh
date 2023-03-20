import Logo from "../../../assets/img/logo.png";
import NavItem from "../../navItem";
import {
    IconDashboard,
    IconProduct,
    IconCategory,
    IconCustomer,
    IconOrder,
    IconSetting,
    IconStaff,
    IconLogout,
} from "../../icon";

import styles from "./styles.module.css";

export default function Sidebar({ tabActive, onClickTab }) {
    return (
        <aside className={`${styles.sidebar} bg-bgSecondary`}>
            <div className="cursor-pointer">
                <img src={Logo} alt="logo" />
            </div>
            <div className="grow mt-8">
                <NavItem
                    title="Tổng Quan"
                    icon={<IconDashboard />}
                    isActive={tabActive === ""}
                    onClick={() => onClickTab("")}
                />
                <NavItem
                    title="Sản Phẩm"
                    icon={<IconProduct />}
                    isActive={tabActive === "products"}
                    onClick={() => onClickTab("products")}
                />
                <NavItem
                    title="Danh Mục"
                    icon={<IconCategory />}
                    isActive={tabActive === "category"}
                    onClick={() => onClickTab("category")}
                />
                <NavItem
                    title="Khách Hàng"
                    icon={<IconCustomer />}
                    isActive={tabActive === "customers"}
                    onClick={() => onClickTab("customers")}
                />
                <NavItem
                    title="Đơn Hàng"
                    icon={<IconOrder />}
                    isActive={tabActive === "orders"}
                    onClick={() => onClickTab("orders")}
                />
                <NavItem
                    title="Nhân Viên"
                    icon={<IconStaff />}
                    isActive={tabActive === "staffs"}
                    onClick={() => onClickTab("staffs")}
                />
                <NavItem
                    title="Cài Đặt"
                    icon={<IconSetting />}
                    isActive={tabActive === "setting"}
                    onClick={() => onClickTab("setting")}
                />
            </div>
            <button className="px-5 py-3 bg-primary font-semibold rounded-lg text-white text-sm flex items-center justify-center">
                <div className="text-xl">
                    {" "}
                    <IconLogout />
                </div>
                <span className="ml-4">Đăng Xuất</span>
            </button>
        </aside>
    );
}
