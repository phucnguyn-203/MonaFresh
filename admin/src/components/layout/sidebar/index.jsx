import Logo from "../../../assets/img/logo.png";
import NavItem from "../../navItem";
import { IconLogout } from "../../icon";
import navigation from "../../../router/navigation";
import styles from "./styles.module.css";

export default function Sidebar() {
    return (
        <aside className={`${styles.sidebar} bg-bgSecondary`}>
            <div className="cursor-pointer">
                <img src={Logo} alt="logo" />
            </div>
            <div className={`${styles.navbar} grow mt-8`}>
                {navigation.map(({ title, icon, path }) => (
                    <NavItem title={title} icon={icon} path={path} />
                ))}
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
