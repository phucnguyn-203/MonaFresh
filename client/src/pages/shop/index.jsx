import Main from "../../components/main";
import styles from "./styles.module.css";
import ShopPageTitle from "../../components/shopPageTitle";
import Sidebar from "../../components/sidebar";
import ListProducts from "../../components/listProducts";

export default function Shop() {
    return (
        <div className={styles.app}>
            <ShopPageTitle currentPage="CỬA HÀNG" />
            <Main sidebar={<Sidebar />} listProducts={<ListProducts />} />
        </div>
    );
}
