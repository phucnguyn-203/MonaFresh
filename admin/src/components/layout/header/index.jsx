import { IconNotification } from "../../icon";
import ProfileAvatar from "../../profileAvatar";
import { useSelector } from "react-redux";

import styles from "./styles.module.css";

export default function Header() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <header className={`${styles.header} bg-bgSecondary`}>
      <ul className="flex items-center cursor-pointer">
        <li className="ml-6 text-primary">
          <IconNotification />
        </li>
        <li className="ml-6 flex items-center gap-x-2">
          <ProfileAvatar url={currentUser?.photo} size={35} isActive={false} />
          <p>{currentUser?.name}</p>
        </li>
      </ul>
    </header>
  );
}
