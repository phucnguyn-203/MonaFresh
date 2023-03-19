import style from "./styles.module.css";

import Sidebar from "../../components/layout/sidebar";
import Content from "../../components/layout/content";
import { Outlet } from "react-router-dom";
export default function Root() {
    return (
        <div className="app">
            <Sidebar />
            <Content>
                <Outlet />
            </Content>
        </div>
    );
}
