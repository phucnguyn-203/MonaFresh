import Header from "../Header";
import Footer from "../Footer";

import styles from "./styles.module.css";

export default function DefaultLayout({ children }) {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}
