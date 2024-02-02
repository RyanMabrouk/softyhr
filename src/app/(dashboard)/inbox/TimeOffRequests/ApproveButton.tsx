import React from "react";

export function ApproveButton({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  return (
    <div
      className={` cursor-pointer rounded-md border border-fabric-700 bg-white px-2 py-1 text-center font-semibold text-fabric-700 transition-all ease-linear hover:bg-fabric-700 hover:text-white ${className}`}
    >
      Approve
    </div>
  );
}
