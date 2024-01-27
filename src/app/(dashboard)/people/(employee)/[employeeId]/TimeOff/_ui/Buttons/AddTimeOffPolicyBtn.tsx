"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AddTimeOffPolicyBtn() {
  const pathname = usePathname();
  return (
    <Link
      href={{
        pathname: pathname,
        query: { popup: "ADD_TIME_OFF_POLICY" },
      }}
      className="relative m-0 box-border inline-flex h-full w-full min-w-0 cursor-pointer select-none appearance-none items-center justify-center rounded border border-solid border-gray-25 bg-transparent px-[15px] py-[5px] align-middle text-[0.9375rem] font-bold normal-case leading-[1.75]  text-gray-25 no-underline shadow-[rgba(0,0,0,0.05)_0px_1px_0px_0px] hover:shadow-md"
    >
      Add Time Off Policy
    </Link>
  );
}
