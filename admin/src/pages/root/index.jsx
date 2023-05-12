import Sidebar from "../../components/layout/sidebar";
import Content from "../../components/layout/content";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";

export default function Root() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Content>
                <Outlet />
            </Content>
        </div>
    );
}
