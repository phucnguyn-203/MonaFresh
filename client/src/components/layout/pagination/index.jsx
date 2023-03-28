import styles from "./styles.module.css";
import IconPrevious from "../../icons/previous";
import IconNext from "../../icons/next";

export default function Pagination() {
  return (
    <div className="w-full ">
      <ul
        className={`flex justify-center items-center my-[30px] h-[30px]  ${styles.pagination}`}
      >
        <li>
          <button className="text-base px-[10px]">
            <IconPrevious />
          </button>
        </li>
        <li>
          <a className={styles.currentNumberPage}>1</a>
        </li>
        <li>
          <a>2</a>
        </li>
        <li>
          <a>3</a>
        </li>
        <li>
          <a>...</a>
        </li>
        <li>
          <button className="text-base px-[10px]">
            <IconNext />
          </button>
        </li>
      </ul>
    </div>
  );
}
