import { useEffect, useState, useRef } from "react";
import { IconNotification } from "../../icon";
import { useSelector } from "react-redux";
import ProfileAvatar from "../../profileAvatar";
import NotificationList from "../../notification/NotificationList";
import styles from "./styles.module.css";

export default function Header() {
  const [isDropdown, setIsDropdown] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState();
  const notificationsRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const notifications = useSelector((state) => state.notifications.items);

  useEffect(() => {
    const result = notifications.filter((item) => item.unread === true);
    setUnreadNotifications(result.length);
  }, [notifications]);

  const handleDropdownMenu = () => {
    setIsDropdown(!isDropdown);
  };

  const handleClickOutSite = (event) => {
    if (notificationsRef.current?.contains(event.target)) {
      // click inside
      return;
    }
    //click outside
    setIsDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSite);
    return () => document.removeEventListener("click", handleClickOutSite);
  }, []);

  return (
    <header className={`${styles.header} bg-bgSecondary`}>
      <ul className="flex items-center cursor-pointer">
        <li ref={notificationsRef} className=" relative ml-6 text-primary" onClick={handleDropdownMenu}>
          <IconNotification />
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
            <p className="text-xs text-white font-semibold">{unreadNotifications}</p>
          </div>
          {isDropdown && <NotificationList notifications={notifications} />}
        </li>
        <li className="ml-6 flex items-center gap-x-2">
          <ProfileAvatar url={currentUser?.photo} size={35} isActive={false} />
          <p>{currentUser?.name}</p>
        </li>
      </ul>
    </header>
  );
}
