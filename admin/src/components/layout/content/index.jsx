import styles from "./styles.module.css";

import Header from "../header";
export default function Content({ children }) {
    return (
        <div className={styles.content}>
            <Header />
            <main className={`${styles.main} bg-bgPrimary`}>{children}</main>
        </div>
    );
}
