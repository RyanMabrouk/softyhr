"use client";
import Link from "next/link";
import React from "react";
import { FaRedoAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";

export function EnableCategoryBtn({ id }: { id: number }) {
  const pathname = usePathname();
  return (
    <Link
      href={{
        pathname: pathname,
        query: {
          categories_id: id,
          popup: "ENABLE_LEAVE_CATEGORY",
        },
      }}
      className="absolute inset-x-0 bottom-1.5 flex flex-row items-center justify-center gap-1 text-[0.95rem] font-semibold text-color5-500  opacity-0 transition-all ease-linear hover:text-fabric-700 hover:underline group-hover:opacity-100"
    >
      <FaRedoAlt />
      <span>Enable Category</span>
    </Link>
  );
}
