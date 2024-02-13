import React from "react";
import { IoMdSettings } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";

export default function FileSettingsButton({ hover }: { hover: boolean }) {
  return (
    <div
      data-tip="Settings"
      className={`tooltip flex h-8 w-14 cursor-pointer items-center justify-center rounded-md border border-transparent text-gray-25 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block `}
    >
      <IoMdSettings />
      <TiArrowSortedDown />
    </div>
  );
}
