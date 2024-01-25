"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { usePathname } from "next/navigation";

export function AddPolicyBtn({ id }: { id: number }) {
  const pathname = usePathname();
  return (
    <Link
      href={{
        pathname: pathname + "/policy",
        query: {
          categories_id: id,
        },
      }}
      className="absolute inset-x-0 bottom-1.5 flex flex-row items-center justify-center gap-1 text-[0.95rem] font-semibold text-color5-500 opacity-0 transition-all ease-linear hover:text-fabric-700 hover:underline group-hover:opacity-100"
    >
      <MdOutlineAddCircle />
      <span>Add Policy</span>
    </Link>
  );
}
