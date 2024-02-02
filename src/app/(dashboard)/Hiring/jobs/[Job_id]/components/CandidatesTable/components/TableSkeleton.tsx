import React from "react";

function TableSkeleton() {
  return (
    <div
      role="status"
      className="mt-12 flex h-full w-full flex-col items-start justify-center gap-[2rem]"
    >
      <div className="flex items-center justify-center gap-1">
        <div className="me-3 h-2 w-10 rounded-l-sm bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-6 w-40 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div role="status" className="w-full animate-pulse">
        <div className=" mb-2.5 h-3.5 w-40 rounded-sm bg-gray-300 dark:bg-gray-700"></div>
        <div className=" h-2.5 max-w-[540px] rounded-sm bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="me-4 h-8 w-8 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="me-3 h-6 w-20 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-6 w-40 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-6 w-40 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="me-3 h-6 w-20 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-6 w-40 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-6 w-40 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
      <div
        role="status"
        className="h-full w-full animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700"
      >
        <div className="flex h-full w-full items-center justify-between bg-gray-14 px-4 py-2">
          <div className="mb-2.5 mt-2 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
          <div className="mb-2.5 mt-2 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
          <div className="mb-2.5 mt-2 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
          <div className="mb-2.5 mt-2 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
          <div className="mb-2.5 mt-2 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
          <div className="mb-2.5 mt-2 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-[30rem] rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-sm bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-[30rem] rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-sm bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-[30rem] rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-sm bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-[30rem] rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-sm bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-[30rem] rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 mt-4 h-[2rem] w-40 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-[1rem] w-32 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-sm bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="h-4 w-[35rem] rounded-sm bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
}

export default TableSkeleton;
