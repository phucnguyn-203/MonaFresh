import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutUser } from "../../../features/auth/authSlice";
import authAPI from "../../../api/authAPI";
import NavItem from "../../navItem";
import { IconLogout } from "../../icon";
import { adminNavigation, staffNavigation } from "../../../utils/navigation";
import { USER_ROLES } from "../../../utils/Constant";

import styles from "./styles.module.css";
import Logo from "../../../assets/img/logo.png";

export default function Sidebar() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await authAPI.logout();
            dispatch(setLogoutUser());
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <aside className={`${styles.sidebar} bg-bgSecondary`}>
            <Link to="/" className="cursor-pointer">
                <img src={Logo} alt="logo" />
            </Link>
            <div className={`${styles.navbar} grow mt-8`}>
                {auth.currentUser.role === USER_ROLES.ADMIN
                    ? adminNavigation.map(({ title, icon, path }) => (
                          <NavItem key={path} title={title} icon={icon} path={path} />
                      ))
                    : staffNavigation.map(({ title, icon, path }) => (
                          <NavItem key={path} title={title} icon={icon} path={path} />
                      ))}
            </div>
            <button
                onClick={handleLogout}
                className="px-5 py-3 bg-primary hover:bg-emerald-700 font-semibold rounded-lg text-white text-sm flex items-center justify-center"
            >
                <div className="text-xl">
                    {" "}
                    <IconLogout />
                </div>
                <span className="ml-4">Đăng Xuất</span>
            </button>
        </aside>
    );
}
