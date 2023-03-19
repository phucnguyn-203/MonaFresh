import styles from "./styles.module.css";

import Header from "../header";
export default function Content({ children }) {
    return (
        <div className="content">
            <Header />
            <main>{children}</main>
        </div>
    );
}
