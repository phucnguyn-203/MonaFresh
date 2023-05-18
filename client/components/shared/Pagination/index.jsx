import { IconNext, IconPrevious } from "@/components/icons";
import { usePagination, DOTS } from "@/hooks/usePagination";
import styles from "./styles.module.css";

export default function Pagination({
  onPageChange,
  totalPageCount,
  siblingCount = 1,
  currentPage,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalPageCount,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
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
    <div className="flex items-center justify-center my-10">
      <button
        disabled={currentPage === 1}
        onClick={onPrevious}
        className={`text-base px-[10px] h-3 ${
          currentPage === 1 ? "cursor-not-allowed" : ""
        }`}
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
              <span
                className={`${
                  pageNumber === currentPage
                    ? `${styles.currentNumberPage}`
                    : ""
                }`}
              >
                {pageNumber}
              </span>
            </li>
          );
        })}
      </ul>
      <button
        disabled={currentPage === lastPage}
        className={`text-base px-[10px] h-3  ${
          currentPage === lastPage ? "cursor-not-allowed" : ""
        }`}
        onClick={onNext}
      >
        <IconNext />
      </button>
    </div>
  );
}
