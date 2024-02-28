"use client";
import React from "react";
import { useAcceptLeaveRequest } from "../../../../people/(employee)/[employeeId]/TimeOff/hooks/useAcceptLeaveRequest";
import { request_type } from "../../../../people/(employee)/[employeeId]/TimeOff/types/types";
import { FaCheck } from "react-icons/fa";

export function ApproveNotifBtn({
  request,
  className,
}: {
  request: request_type;
  className?: string;
}) {
  const { accept, isAccepting } = useAcceptLeaveRequest({
    request: request,
  });
  return (
    <button
      disabled={isAccepting}
      className={`tooltip cursor-pointer rounded-md border border-fabric-700 bg-fabric-700  px-2 py-1.5 text-center font-semibold transition-all ease-linear hover:bg-fabric-700 hover:text-white ${className} ${isAccepting ? "cursor-wait" : ""}`}
      onClick={() => accept()}
      data-tip="Accept"
    >
      <FaCheck className="h-4 w-4  rounded-full bg-white p-0.5 text-fabric-700" />
    </button>
  );
}
