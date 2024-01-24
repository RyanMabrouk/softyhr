import { MenuLinksGeneric } from "@/app/_ui/MenuLinksGeneric";
import React from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import { HiUsers } from "react-icons/hi";
import { TiPlus } from "react-icons/ti";

function AddCollaborate() {
  const pathname = usePathname();
  return (
    <div
      id="timeoff_settings"
      className="flex w-[3rem] cursor-pointer flex-row items-center justify-center gap-1 border border-gray-25 px-1 py-[1.7px] shadow-sm transition-all ease-linear hover:shadow-md"
    >
      <HiUsers className="h-8 w-14 text-gray-25" />
      <TiPlus className="text-[2rem] text-gray-25" />
    </div>
  );
}

export default AddCollaborate;
