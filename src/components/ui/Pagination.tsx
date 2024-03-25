import { PAGE_SIZE } from "@/constants/filesConstants";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Pagination({
  count,
  page,
  handlePage,
}: {
  count: number;
  page: number;
  handlePage: (page: number) => void;
}) {
  const currentPage = page;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    handlePage(next);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    handlePage(prev);
  }

  if (pageCount <= 1) return null;

  return (
    <div className=" mt-8 flex w-full items-center justify-between">
      <p className=" flex flex-row gap-1 text-gray-25">
        Showing
        <span className=" font-semibold text-color-primary-8">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>
        to
        <span className=" font-semibold text-color-primary-8">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>
        of <span className=" font-semibold text-color-primary-8">{count}</span>{" "}
        results
      </p>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center justify-center gap-2 rounded border border-transparent bg-fabric-700 px-3 py-1 text-white transition-all ease-linear disabled:border-gray-25 disabled:bg-white disabled:text-gray-25 ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-fabric-800"}`}
        >
          <HiChevronLeft />
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`flex items-center justify-center gap-2 rounded border border-transparent bg-fabric-700 px-3 py-1 text-white transition-all ease-linear disabled:border-gray-25 disabled:bg-white disabled:text-gray-25 ${currentPage === pageCount ? "cursor-not-allowed" : "hover:bg-fabric-800"}`}
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
