import React from "react";
import { IoMdSettings } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";

export default function FileSettingsButton() {
  return (
    <div>
      <div className="flex  cursor-pointer gap-1 p-1.5 transition-all duration-300 hover:border-spacing-4 hover:border  hover:border-color-primary-8">
        <IoMdSettings fontSize="1rem" fill="#38312F" />
        <TiArrowSortedDown fontSize="1rem" fill="#38312F" />
      </div>
    </div>
  );
}
