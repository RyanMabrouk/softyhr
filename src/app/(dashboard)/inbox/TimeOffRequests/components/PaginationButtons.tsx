"use client";
import React from "react";
import { TbPlayerTrackNext } from "react-icons/tb";

export function PaginationButtons({
  page,
  setPage,
  dataLength,
  cards_per_page_in_client,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dataLength: number;
  cards_per_page_in_client: number;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <div
        className={`mt-4 flex w-60 flex-row items-center gap-7 ${page === 1 && dataLength < cards_per_page_in_client ? "justify-center" : ""}`}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => old - 1)}
          className={`flex cursor-pointer flex-row items-center gap-0.5 self-start justify-self-start text-color5-500 hover:underline disabled:hidden`}
        >
          <TbPlayerTrackNext className="-mb-1 rotate-180 text-[0.75rem]" />
          <span>Prev</span>
        </button>
        <div
          className={`flex w-fit flex-row items-center justify-items-center gap-1.5 self-center justify-self-center text-gray-21 ${page === 1 && dataLength === cards_per_page_in_client ? "ml-auto" : ""}`}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((old) => old - 1)}
            className=" cursor-pointer rounded-sm border border-fabric-700 px-2 py-0.5 text-sm transition-all ease-linear hover:border-white hover:bg-fabric-700 hover:text-white disabled:hidden"
          >
            {page - 1}
          </button>
          <button className="cursor-pointer rounded-sm border border-gray-14 bg-gray-14 px-2 py-0.5 text-sm transition-all ease-linear hover:border-white hover:bg-fabric-700 hover:text-white">
            {page}
          </button>
          <button
            disabled={dataLength < cards_per_page_in_client}
            className=" cursor-pointer rounded-sm border border-fabric-700 px-2 py-0.5 text-sm transition-all ease-linear hover:border-white hover:bg-fabric-700 hover:text-white disabled:hidden"
            onClick={() => setPage((old) => old + 1)}
          >
            {page + 1}
          </button>
        </div>
        <button
          disabled={dataLength < cards_per_page_in_client}
          onClick={() => setPage((old) => old + 1)}
          className={`flex cursor-pointer flex-row items-center gap-0.5 self-end justify-self-end text-color5-500 hover:underline disabled:hidden`}
        >
          <span>Next</span>
          <TbPlayerTrackNext className="-mb-1 text-[0.75rem]" />
        </button>
      </div>
    </div>
  );
}
