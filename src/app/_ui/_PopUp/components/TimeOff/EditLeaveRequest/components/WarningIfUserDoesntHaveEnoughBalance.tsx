"use client";
import { database_profile_leave_balance_type } from "@/types/database.tables.types";
import React from "react";
import useEmployeeData from "@/hooks/useEmloyeeData";
import usePolicy from "@/hooks/TimeOff/usePolicy";
import { useTotalDurationContext } from "../context/TotalDurationContext";
import { formatTotalHoursToTimeUnit } from "@/helpers/TimeOff/leave.helpers";

export function WarningIfUserDoesntHaveEnoughBalance({
  employeeId,
  policy_id,
}: {
  employeeId: string;
  policy_id: string | undefined;
}) {
  const { totalDuration } = useTotalDurationContext();
  const {
    leave_balance: { data: current_user_leave_balances },
  } = useEmployeeData({ employeeId: employeeId });
  const { policy, category } = usePolicy({
    policy_id: Number(policy_id),
  });
  if (policy?.type === "unlimited") return;
  const active_balance: number | undefined = current_user_leave_balances?.find(
    (e: database_profile_leave_balance_type) =>
      e.policy_id == Number(policy_id),
  )?.balance;
  if (totalDuration === undefined || active_balance === undefined) return;
  if (totalDuration === 0 || totalDuration < active_balance) return;
  return (
    <div className="-mt-6 ml-2 flex flex-col gap-1">
      <span className="text-color9-500">
        You only have{" "}
        {formatTotalHoursToTimeUnit(
          active_balance,
          category?.track_time_unit ?? "hours",
        )}{" "}
        in balance.
      </span>
      <span className="gray-21 text-sm">
        You can continue with this request anyway.
      </span>
    </div>
  );
}
