"use client";
import { formatTotalHoursToTimeUnit } from "@/helpers/leave.helpers";
import {
  database_leave_policies_policy_type,
  databese_leave_categories_track_time_unit_type,
} from "@/types/database.tables.types";
import React from "react";

export function PolicyInfo({
  id,
  icon,
  hours_scheduled,
  hours_available,
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
    <div className="flex w-full flex-col items-center justify-center rounded-md bg-white py-2 group-hover:rounded-b-none  group-hover:bg-gray-17">
      <span className="mb-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-bold capitalize text-gray-27">
        {title}
      </span>
      <div className="flex flex-row items-center gap-1.5">
        {icon}
        <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-3xl font-bold leading-[2.8rem]  text-fabric-700 ">
          {formatTotalHoursToTimeUnit(hours_available, category_time_unit, {
            remove_time_unit: true,
          })}
        </span>
      </div>
      <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-bold capitalize leading-6 text-fabric-700">
        {`${category_time_unit} ${type === "unlimited" ? "Used" : "Available"}`}
      </span>
      <span className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-gray-21">
        {`${formatTotalHoursToTimeUnit(
          hours_scheduled,
          category_time_unit,
        )} scheduled`}
      </span>
    </div>
  );
}
