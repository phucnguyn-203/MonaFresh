import { IconNotification } from "../../icon";
import ProfileAvatar from "../../profileAvatar";
import { useSelector } from "react-redux";

import styles from "./styles.module.css";

export default function Header() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    return (
        <header className={`${styles.header} text-primary bg-bgSecondary`}>
            <ul className="flex items-center cursor-pointer">
                <li className="ml-6">
                    <IconNotification />
                </li>
                <li className="ml-6">
                    <ProfileAvatar url={currentUser?.photo} size={32} isActive={false} />
                </li>
            </ul>
        </header>
    );
}
