import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

export default function NavItem({ title, icon, path }) {
  const Icon = icon;
  return (
    <NavLink to={path} className={({ isActive }) => (isActive ? "text-textPrimary" : "text-textSecondary")}>
      <div className={`${styles.navItem}`}>
        <div className="text-xl w-5 h-5">{<Icon />}</div>
        <p className="ml-4 font-semibold text-sm">{title}</p>
      </div>
    </NavLink>
  );
}
