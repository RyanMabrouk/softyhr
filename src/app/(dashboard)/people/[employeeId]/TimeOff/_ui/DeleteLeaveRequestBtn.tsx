"use client";
import React from "react";
import { MdDelete } from "react-icons/md";

export function DeleteLeaveRequestBtn({ className }: { className: string }) {
  return (
    <div className="flex flex-row items-center justify-center">
      <MdDelete aria-label="Delete" className={className} />
    </div>
  );
}
