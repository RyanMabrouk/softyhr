import React from "react";
import { IoMdSettings } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";

export default function FileSettingsButton({ hover }: any) {
  return (
    <div>
      <div
        className={`flex  border-spacing-4 cursor-pointer gap-1 border border-transparent p-1.5 transition-all ease-linear ${hover ? "hover:border-spacing-4 hover:border  hover:border-color-primary-8" : "  border-color-primary-8"}  `}
      >
        <IoMdSettings fontSize="1rem" fill="#38312F" />
        <TiArrowSortedDown fontSize="1rem" fill="#38312F" />
      </div>
    </div>
  );
}
