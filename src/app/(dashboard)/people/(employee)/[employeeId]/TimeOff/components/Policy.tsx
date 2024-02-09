import React from "react";
import { AddLeaveRequestBtn } from "./Buttons/AddLeaveRequestBtn";
import { AdjustLeavePolicyBalanceBtn } from "./Buttons/AdjustLeavePolicyBalanceBtn";
import {
  database_leave_policies_policy_type,
  databese_leave_categories_track_time_unit_type,
} from "@/types/database.tables.types";
import { formatTotalHoursToTimeUnit } from "@/helpers/leave.helpers";
import { ChangePolicyMenuBtn } from "./Buttons/ChangePolicyMenuBtn";
import { CalculatorBtn } from "./CalculatorBtn";
import RoleGuard from "@/app/_ui/RoleGuard";
export function Policy({
  id,
  icon,
  hours_scheduled,
  hours_available,
  name,
  title,
  category_time_unit,
  type,
}: {
  id: number;
  icon: React.ReactNode;
  hours_scheduled: number;
  hours_available: number;
  name: string;
  title: string;
  category_time_unit: databese_leave_categories_track_time_unit_type;
  type: database_leave_policies_policy_type;
}) {
  return (
    <div
      className="group relative flex h-fit w-fit  flex-col items-center justify-between gap-1 pt-6 "
      suppressHydrationWarning
    >
      <div className="flex min-w-[20rem] flex-col items-center justify-center gap-1 rounded-md  bg-gray-14 px-[auto] py-3 group-hover:rounded-b-none  group-hover:bg-gray-17">
        <span className="mb-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-base font-bold capitalize leading-[1.467rem] text-gray-27">
          {title}
        </span>
        <div className="flex flex-row items-center gap-1">
          {icon}
          <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-[2.266rem] font-bold leading-[2.8rem]  text-fabric-700 ">
            {formatTotalHoursToTimeUnit(hours_available, category_time_unit, {
              remove_time_unit: true,
            })}
          </span>
        </div>
        <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-base font-bold capitalize leading-[1.467rem] text-fabric-700">
          {`${category_time_unit} ${type === "unlimited" ? "Used" : "Available"}`}
        </span>
        <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal leading-[1.467rem] text-gray-21">
          {`${formatTotalHoursToTimeUnit(
            hours_scheduled,
            category_time_unit,
          )} scheduled`}
        </span>
      </div>
      <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap pb-4 pt-1  text-sm font-normal leading-[1.467rem] text-gray-21">
        {name}
      </span>
      <ChangePolicyMenuBtn id={id} />
      <div className="absolute -top-2 box-border flex  w-full -translate-x-5 translate-y-10 flex-row items-center justify-center gap-2 rounded-[0px_0px_8px_8px] border-solid  border-[10px_2px_2px] py-3 text-center text-gray-25 opacity-0 transition-all delay-0 duration-200 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0  group-hover:opacity-100">
        <AddLeaveRequestBtn id={id} />
        {type === "traditional" && <CalculatorBtn id={id} />}
        <RoleGuard permissions={["adjust:leave_balance"]}>
          <AdjustLeavePolicyBalanceBtn id={id} />
        </RoleGuard>
      </div>
    </div>
  );
}
