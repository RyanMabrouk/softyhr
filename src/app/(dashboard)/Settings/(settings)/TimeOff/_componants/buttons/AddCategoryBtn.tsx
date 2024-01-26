"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineAddCircle } from "react-icons/md";

export function AddCategoryBtn() {
  const pathname = usePathname();
  return (
    <div className="line-clamp-1 flex h-full w-full max-w-[14.5rem] flex-col items-center justify-center overflow-hidden rounded-md  border-[3px] border-dashed border-gray-16 px-[2rem] py-[3.4rem]">
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
