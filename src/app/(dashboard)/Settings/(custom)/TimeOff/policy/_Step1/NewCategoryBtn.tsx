"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { MdOutlineAddCircle } from "react-icons/md";

export function NewCategoryBtn() {
  const pathname = usePathname();
  return (
    <div className="group  relative flex  w-60 cursor-pointer  items-center justify-center gap-2 overflow-hidden rounded-md  border-[3px] border-dashed border-gray-16  px-4 py-6 duration-150 ease-linear ">
      <Link
        href={{
          pathname: pathname,
          query: { popup: "EDIT_LEAVE_CATEGORY" },
        }}
        className="flex flex-row items-center justify-center gap-1 font-semibold text-color5-500  transition-all ease-linear hover:text-fabric-700 hover:underline"
      >
        <MdOutlineAddCircle />
        <span>New Category</span>
      </Link>
    </div>
  );
}
