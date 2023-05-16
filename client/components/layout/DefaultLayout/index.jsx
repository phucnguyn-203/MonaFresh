import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { setUserSuccess, setUserFail } from "@/features/auth/authSlice";
import userAPI from "@/api/userAPI";
import Loading from "@/components/loading";
import styles from "./styles.module.css";

export default function DefaultLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIsLogin = async () => {
      try {
        const response = await userAPI.checkIsLogin();
        dispatch(setUserSuccess(response.data));
      } catch {
        dispatch(setUserFail);
      } finally {
        setIsLoading(false);
      }
    };
    checkIsLogin();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.app}>
          <Header />
          <main className={styles.content}>{children}</main>
          <Footer />
        </div>
      )}
    </React.Fragment>
  );
}
