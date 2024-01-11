import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdModeEdit } from "react-icons/md";
export function EditLeaveRequestBtn({
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
          popup: "EDIT_LEAVE_REQUEST",
          leave_request_id: leave_request_id,
        },
      }}
      className="flex flex-row items-center justify-center"
    >
      <MdModeEdit aria-label="Edit" className={className} />
    </Link>
  );
}
