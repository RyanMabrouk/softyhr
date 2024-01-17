"use client";
import React from "react";
import { useAlreadyBooked } from "../hooks/useAlreadyBooked";
import { useParams } from "next/navigation";
export function WarningIfDatesAlreadyBooked() {
  const { employeeId } = useParams();
  const already_booked = useAlreadyBooked(employeeId);
  if (!already_booked) return null;
  return (
    <div className="-mt-6 ml-2 flex flex-col gap-1 self-end justify-self-center">
      <span className="text-color9-500">
        You've already requested time off for this period.
      </span>
      <span className="gray-21 text-sm">
        You can continue with this request, but we just wanted to let you know.
      </span>
    </div>
  );
}
