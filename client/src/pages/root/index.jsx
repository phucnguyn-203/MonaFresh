import React from "react";
import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

const Root = () => {
  return (
    <div className="app">
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
