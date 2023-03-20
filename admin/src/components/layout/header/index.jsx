import { IconNotification } from "../../icon";
import ProfileAvatar from "../../profileAvatar";

import styles from "./styles.module.css";

export default function Header() {
    return (
        <header className={`${styles.header} text-primary bg-bgSecondary`}>
            <ul className="flex items-center cursor-pointer">
                <li className="ml-6">
                    <IconNotification />
                </li>
                <li className="ml-6">
                    <ProfileAvatar
                        url="https://scontent.fsgn13-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ZKoekN_r_owAX-QJWws&_nc_ht=scontent.fsgn13-4.fna&oh=00_AfBe5riNCEqjF_mzQLaAMzp8DTaUrDPK9KExJtbf9UdOvQ&oe=643F5838"
                        size={32}
                        isActive={false}
                    />
                </li>
            </ul>
        </header>
    );
}
