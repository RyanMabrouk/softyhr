"use client";
import React from "react";
import { formatDateToDayMonDD } from "@/helpers/date.helpers";
import useEmployeeData from "@/hooks/useEmloyeeData";
import {
  database_leave_policies_type,
  database_leave_requests_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { generateLeaveCategorieIcon } from "@/helpers/TimeOff/leave.helpers";
import useLeaveData from "@/hooks/TimeOff/useLeaveData";

export function VacationStatus({ employeeId }: { employeeId: string }) {
  const {
    leave_categories: { data: leave_categories },
    leave_policies: { data: leave_policies },
  } = useLeaveData();
  const {
    leave_requests: { data: leave_requests },
  } = useEmployeeData({ employeeId: employeeId });
  // chekck if the user is on vacation
  const current_vacation = leave_requests?.find(
    (request: database_leave_requests_type) =>
      new Date(request.start_at) < new Date() &&
      new Date(request.end_at) > new Date() &&
      request.status === "approved",
  );
  // get the policy of the current vacation
  const policy = current_vacation
    ? leave_policies?.find(
        (p: database_leave_policies_type) =>
          p.id === current_vacation?.policy_id,
      )
    : null;
  // get the category of the current vacation
  const category = current_vacation
    ? leave_categories?.find(
        (c: databese_leave_categories_type) => c.id == policy?.categories_id,
      )
    : null;
  // generate the icon of the current vacation
  const icon = generateLeaveCategorieIcon({
    categorie: category,
    className: "w-14 h-14 -mt-1",
  });
  return (
    <>
      {current_vacation && (
        <header className="-mb-5 flex w-full flex-row items-center justify-center gap-1 border-b-[10px] border-white px-6 pb-3 pt-7 leading-4">
          <div>{icon}</div>
          <div className="flex flex-col justify-center text-lg leading-5">
            <div>{`Out Until ${formatDateToDayMonDD(new Date(current_vacation?.start_at))}`}</div>
            <div className="text-[0.8rem] opacity-65">{category?.name}</div>
          </div>
        </header>
      )}
    </>
  );
}
