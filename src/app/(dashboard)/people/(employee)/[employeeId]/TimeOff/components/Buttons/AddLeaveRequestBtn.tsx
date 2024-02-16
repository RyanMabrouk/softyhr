import React from "react";
import { TbClockEdit } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AddLeaveRequestBtn({ id }: { id: number }) {
  const pathname = usePathname();
  return (
    <Link
      className="tooltip tooltip-bottom "
      data-tip="Record time off"
      href={{
        pathname: pathname,
        query: { popup: "EDIT_LEAVE_REQUEST", leave_policy_id: id },
      }}
    >
      <TbClockEdit className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-black bg-white px-2 text-center  " />
    </Link>
  );
}
