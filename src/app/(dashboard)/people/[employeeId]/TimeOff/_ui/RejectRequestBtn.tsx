"use client";
import React from "react";
import { CgClose } from "react-icons/cg";
import { useParams } from "next/navigation";
import Link from "next/link";
export function RejectRequestBtn({
  leave_request_id,
}: {
  leave_request_id: number;
}) {
  const { employeeId } = useParams();
  return (
    <>
      <Link
        href={{
          pathname: `/people/${employeeId}/TimeOff`,
          query: {
            popup: "RJECT_LEAVE_REQUEST",
            leave_request_id: leave_request_id,
          },
        }}
      >
        <CgClose className="hidden h-7 w-7 cursor-pointer rounded-md border border-transparent p-0.5 text-gray-21 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block" />
      </Link>
    </>
  );
}
