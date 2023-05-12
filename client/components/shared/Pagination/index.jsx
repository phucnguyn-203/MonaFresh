import { IconNext, IconPrevious } from "@/components/icons";

import styles from "./styles.module.css";

export default function Pagination() {
  return (
    <div className="w-full ">
      <ul
        className={`flex justify-center items-center my-[30px] h-[30px]  ${styles.pagination}`}
      >
        <li>
          <button className="text-base px-[10px] h-3 ">
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
          <button className="text-base px-[10px] h-3">
            <IconNext />
          </button>
        </li>
      </ul>
    </div>
  );
}
