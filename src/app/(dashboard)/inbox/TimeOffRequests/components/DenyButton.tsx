import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function DenyButton({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      className={`cursor-pointer rounded-md border border-white bg-white px-2 py-1 text-center font-semibold text-gray-23 transition-all ease-linear hover:bg-gray-23 hover:text-white ${className}`}
      href={{
        pathname: pathname,
        query: {
          popup: "RJECT_LEAVE_REQUEST",
          leave_request_id: id,
        },
      }}
    >
      Deny
    </Link>
  );
}
