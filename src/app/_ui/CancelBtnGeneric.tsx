"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type CancelBtnGenericProps = {
  onClick?: () => void;
};
export default function CancelBtnGeneric({ onClick }: CancelBtnGenericProps) {
  const pathname = usePathname();
  return (
    <Link
      className="flex flex-row items-center justify-center"
      href={pathname}
      scroll={false}
    >
      <button
        className="cursor-pointer text-color5-500 transition-all duration-300 ease-linear hover:underline"
        type="button"
        onClick={onClick}
      >
        Cancel
      </button>
    </Link>
  );
}
