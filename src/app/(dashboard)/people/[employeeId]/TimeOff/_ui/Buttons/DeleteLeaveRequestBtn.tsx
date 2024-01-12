import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdDelete } from "react-icons/md";

export function DeleteLeaveRequestBtn({
  className,
  leave_request_id,
}: {
  className: string;
  leave_request_id: number;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={{
        pathname: pathname,
        query: {
          leave_request_id: leave_request_id,
          popup: "DELETE_LEAVE_REQUEST",
        },
      }}
      className="flex flex-row items-center justify-center"
    >
      <MdDelete aria-label="Delete" className={className} />
    </Link>
  );
}
