import React from "react";

export function DenyButton({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  return (
    <div
      className={`cursor-pointer rounded-md border border-white bg-white px-2 py-1 text-center font-semibold text-gray-23 transition-all ease-linear hover:bg-gray-23 hover:text-white ${className}`}
    >
      Deny
    </div>
  );
}
