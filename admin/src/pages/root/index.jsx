import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";
import Content from "../../components/layout/content";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";

export default function Root() {
    const [tabActive, setTabActive] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        navigate(tabActive);
    }, [tabActive, setTabActive]);
    return (
        <div className={styles.app}>
            <Sidebar tabActive={tabActive} onClickTab={setTabActive} />
            <Content>
                <Outlet />
            </Content>
        </div>
    );
}
