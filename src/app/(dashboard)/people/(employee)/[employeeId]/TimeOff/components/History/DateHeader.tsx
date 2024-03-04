"use client";
import React, { useContext } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";
import toggleDateSortContext, {
  toggleDateSortContextType,
} from "../../context/toggleDateSortContext";

export const DateHeader = () => {
  const { setToggleSort, toggleSort } = useContext<toggleDateSortContextType>(
    toggleDateSortContext,
  );
  return (
    <div
      className="flex cursor-pointer flex-row items-center gap-0.5"
      role="button"
      onClick={() => setToggleSort && setToggleSort((old) => !old)}
    >
      <span>Date</span>
      <FaLongArrowAltDown
        className={`text-sm transition-all ease-linear ${toggleSort ? "rotate-180" : ""}`}
      />
    </div>
  );
};
