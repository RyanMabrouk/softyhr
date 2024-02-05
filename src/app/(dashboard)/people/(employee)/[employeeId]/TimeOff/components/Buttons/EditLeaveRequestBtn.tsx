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
      className="tooltip z-[9999] flex flex-row items-center justify-center"
      data-tip="Edit"
      href={{
        pathname: pathname,
        query: {
          popup: "EDIT_LEAVE_REQUEST",
          leave_request_id: leave_request_id,
        },
      }}
    >
      <MdModeEdit aria-label="Edit" className={className} />
    </Link>
  );
}
