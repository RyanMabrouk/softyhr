"use client";
import React from "react";
import { Hr } from "./_ui/Hr";
import { formatDateMMDD } from "@/helpers/date";
import useData from "@/hooks/useData";
import { FaCheckCircle } from "react-icons/fa";
import {
  database_leave_requests_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import {
  formatTotalHoursToTimeUnit,
  generateLeaveCategorieIcon,
} from "@/helpers/leave.helpers";
import { EditLeaveRequestBtn } from "./_ui/EditLeaveRequestBtn";
type upcoming_leave_requests_data_type = {
  id: number;
  start_at: Date;
  end_at: Date;
  policy_title: string;
  icon: JSX.Element;
  duration: string;
  status: "pending" | "approved" | "rejected" | "canceled";
};
export function UpcomingTimeOff() {
  const {
    leave_requests: { data: leave_requests, isPending: isPending2 },
    leave_categories: { data: leave_categories, isPending: isPending3 },
    leave_policies: { data: leave_policies, isPending: isPending4 },
  } = useData();
  const isPending = isPending2 || isPending3 || isPending4;
  const upcoming_leave_requests_data:
    | upcoming_leave_requests_data_type[]
    | undefined = leave_requests
    ?.filter(
      (leave: database_leave_requests_type) =>
        !(new Date(leave.start_at) < new Date() && leave.status == "approved"),
    )
    .sort(
      (a: database_leave_requests_type, b: database_leave_requests_type) =>
        +new Date(a.start_at) - +new Date(b.start_at),
    )
    .map((e: database_leave_requests_type) => {
      const policy = leave_policies?.find((p: any) => p.id === e.policy_id);
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id === policy?.categories_id,
      );
      const duration_used = e.duration_used?.reduce(
        (acc: number, e: any) => acc + Number(e.duration),
        0,
      );
      return {
        id: e.id,
        start_at: new Date(e.start_at),
        end_at: new Date(e.end_at),
        policy_title: categorie?.name || "",
        icon: generateLeaveCategorieIcon({
          categorie: categorie,
          className: "h-11 w-11",
        }),
        duration: duration_used
          ? formatTotalHoursToTimeUnit(
              duration_used,
              categorie?.track_time_unit,
            )
          : "",
        status: e.status,
      };
    });
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col">
      {upcoming_leave_requests_data?.map((leave) => (
        <div className="flex w-full flex-col " key={leave.id}>
          <div className="group flex w-full flex-row items-center justify-between py-6 pl-6 pr-4 transition-all ease-linear hover:bg-gray-14 ">
            <div className="flex flex-row items-center gap-3">
              <div>{leave.icon}</div>
              <div className="flex flex-col justify-center">
                <div className="m-0 font-bold leading-[1.467rem] text-gray-27">
                  {formatDateMMDD(leave.start_at, leave.end_at)}
                </div>
                <div className="-mt-0.5 flex flex-row items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap  text-sm leading-[1.467rem] text-gray-21">
                  {leave.status === "approved" && (
                    <FaCheckCircle className="h-3 w-3 text-fabric-700" />
                  )}
                  <span>{leave.duration}</span>
                  <span> of </span>
                  <span>{leave.policy_title}</span>
                </div>
              </div>
            </div>
            <EditLeaveRequestBtn
              leave_request_id={leave.id}
              className="hidden h-7 w-7 cursor-pointer rounded-md border border-transparent p-0.5 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
            />
          </div>
          <Hr />
        </div>
      ))}
    </div>
  );
}
