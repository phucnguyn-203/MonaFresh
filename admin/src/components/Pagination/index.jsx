import { IconNext, IconPrevious } from "../icon";
import { usePagination, DOTS } from "../../hooks/usePagination";
import styles from "./styles.module.css";

export default function Pagination({
  onPageChange,
  totalPageCount,
  siblingCount = 1,
  currentPage,
  limitPerPage,
  setLimitPerPage,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalPageCount,
    siblingCount,
  });

  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="px-4 py-3 bg-white border-t border-gray-200 text-gray-500">
      <div className="flex items-center justify-between">
        <p className="flex items-center font-semibold tracking-wide uppercase text-xs">
          Hiển thị
          <select
            className="mx-[4px] text-[12px] uppercase"
            defaultValue={limitPerPage}
            onChange={(e) => setLimitPerPage(e.target.value)}
          >
            <option value={10}>10 kết quả</option>
            <option value={15}>15 kết quả</option>
            <option value={20}>20 kết quả</option>
          </select>
        </p>
        <div className="flex items-center justify-center my-[10px]">
          <button
            className={`text-base px-[10px] h-3 ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
            disabled={currentPage === 1}
            onClick={onPrevious}
          >
            <IconPrevious />
          </button>
          <ul className={`flex justify-center items-center  ${styles.pagination}`}>
            {paginationRange.map((pageNumber) => {
              // If the pageItem is a DOT, render the DOTS unicode character
              if (pageNumber === DOTS) {
                return <li key={pageNumber}>&#8230;</li>;
              }

              // Render our Page Pills
              return (
                <li key={pageNumber} onClick={() => onPageChange(pageNumber)}>
                  <span className={`${pageNumber === currentPage ? `${styles.currentNumberPage}` : ""}`}>
                    {pageNumber}
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            className={`text-base px-[10px] h-3 ${currentPage === lastPage ? "cursor-not-allowed" : ""}`}
            disabled={currentPage === lastPage}
            onClick={onNext}
          >
            <IconNext />
          </button>
        </div>
      </div>
    </div>
  );
}
