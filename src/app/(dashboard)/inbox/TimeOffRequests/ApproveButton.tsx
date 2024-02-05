import React from "react";
import { useAcceptLeaveRequest } from "../../people/(employee)/[employeeId]/TimeOff/hooks/useAcceptLeaveRequest";
import { request_type } from "../../people/(employee)/[employeeId]/TimeOff/types/types";

export function ApproveButton({
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
      className={` cursor-pointer rounded-md border border-fabric-700 bg-white px-2 py-1 text-center font-semibold text-fabric-700 transition-all ease-linear hover:bg-fabric-700 hover:text-white ${className} ${isAccepting ? "cursor-wait" : ""}`}
      onClick={() => accept()}
    >
      {isAccepting ? "Approving.." : "Approve"}
    </button>
  );
}
