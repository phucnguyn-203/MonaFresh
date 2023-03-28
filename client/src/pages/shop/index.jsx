import Main from "../../components/layout/main";
import styles from "./styles.module.css";
import ShopPageTitle from "../../components/layout/shopPageTitle";
import Sidebar from "../../components/layout/sidebar";
import ListProducts from "../../components/layout/listProducts";

export default function Shop() {
  return (
    <div className={styles.app}>
      <ShopPageTitle currentPage="CỬA HÀNG" />
      <Main sidebar={<Sidebar />} listProducts={<ListProducts />} />
    </div>
  );
}
