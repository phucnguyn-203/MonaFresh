import styles from "./styles.module.css";

export default function NavItem({ title, icon, isActive, onClick }) {
    return (
        <div
            className={`${styles.navItem} ${
                isActive ? "text-textPrimary" : "text-textSecondary"
            }`}
            onClick={onClick}
        >
            <div className="text-xl">{icon}</div>
            <p className="ml-4 font-semibold text-sm">{title}</p>
        </div>
    );
}
