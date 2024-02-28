"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdCancel } from "react-icons/md";

export function DenyNotifBtn({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      className={`tooltip cursor-pointer rounded-md border border-white  bg-gray-23 px-2 py-1.5 text-center font-semibold text-white transition-all ease-linear ${className}`}
      data-tip="Deny"
      href={{
        pathname: pathname,
        query: {
          popup: "RJECT_LEAVE_REQUEST",
          leave_request_id: id,
        },
      }}
    >
      <MdCancel />
    </Link>
  );
}
