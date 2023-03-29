import React from "react";
import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/header";

const Root = () => {
    return (
        <div className="app">
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;
