"use client";
import React, { Suspense } from "react";
import { Hr } from "../_ui/Hr";
import { formatDateMMDD } from "@/helpers/date.helpers";
import useData from "@/hooks/useData";
import { FaCheckCircle } from "react-icons/fa";
import {
  database_leave_policies_type,
  database_leave_request_duration_used_type,
  database_leave_request_status_type,
  database_leave_requests_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import {
  formatTotalHoursToTimeUnit,
  generateLeaveCategorieIcon,
} from "@/helpers/leave.helpers";
import { EditLeaveRequestBtn } from "../_ui/Buttons/EditLeaveRequestBtn";
import { useParams } from "next/navigation";
import { MdCancel } from "react-icons/md";
import { AcceptRequestBtn } from "../_ui/Buttons/AcceptRequestBtn";
import { RejectRequestBtn } from "../_ui/Buttons/RejectRequestBtn";
import useEmployeeData from "@/hooks/useEmloyeeData";
import useLeaveData from "@/hooks/useLeaveData";
import Loader from "@/app/_ui/Loader/Loader";
import RoleGuard from "@/app/_ui/RoleGuard";
type upcoming_leave_requests_data_type = {
  id: number;
  start_at: Date;
  end_at: Date;
  policy_title: string;
  icon: JSX.Element;
  duration: string;
  status: database_leave_request_status_type;
  note: string;
  policy_id: number;
  user_id: string;
  duration_used: database_leave_request_duration_used_type[];
};
export function UpcomingTimeOff() {
  const { employeeId } = useParams();
  const {
    leave_categories: { data: leave_categories, isPending: isPending3 },
    leave_policies: { data: leave_policies, isPending: isPending4 },
  } = useLeaveData();
  const {
    leave_requests: { data: leave_requests, isPending: isPending2 },
  } = useEmployeeData({ employeeId: employeeId });
  const isPending = isPending2 || isPending3 || isPending4;
  // format leave requests data to upcoming leave requests only
  const upcoming_leave_requests_data:
    | upcoming_leave_requests_data_type[]
    | undefined = leave_requests
    ?.filter(
      (leave: database_leave_requests_type) =>
        !(
          new Date(leave.start_at) < new Date() &&
          (leave.status == "approved" ||
            leave.status == "rejected" ||
            leave.status == "canceled")
        ) && leave.user_id === employeeId,
    )
    .sort(
      (a: database_leave_requests_type, b: database_leave_requests_type) =>
        +new Date(a.start_at) - +new Date(b.start_at),
    )
    .map((e: database_leave_requests_type) => {
      const policy = leave_policies?.find(
        (p: database_leave_policies_type) => p.id === e.policy_id,
      );
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id === policy?.categories_id,
      );
      const duration_used = e.duration_used?.reduce(
        (acc: number, e: any) => acc + Number(e.duration),
        0,
      );
      return {
        start_at: new Date(e.start_at),
        end_at: new Date(e.end_at),
        policy_title: categorie?.name || "",
        icon: generateLeaveCategorieIcon({
          categorie: categorie,
          className: "h-11 w-11",
        }),
        duration: formatTotalHoursToTimeUnit(
          duration_used,
          categorie?.track_time_unit,
        ),
        policy_id: e.policy_id,
        id: e.id,
        user_id: e.user_id,
        duration_used: e.duration_used,
        status: e.status,
        note: e.note,
      };
    });
  if (isPending) {
    throw new Promise((resolve) => setTimeout(resolve, 1)); // Simulate loading delay
  }
  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col">
        {upcoming_leave_requests_data &&
        upcoming_leave_requests_data?.length > 0 ? (
          upcoming_leave_requests_data?.map((leave) => (
            <div className="flex w-full flex-col " key={leave.id}>
              <div className="group flex w-full flex-row items-center justify-between py-6 pl-6 pr-4 transition-all ease-linear hover:bg-gray-14 ">
                <div className="flex w-[11rem] flex-row items-center gap-3">
                  <div>{leave.icon}</div>
                  <div className="flex flex-col justify-center">
                    <div className="m-0 font-bold leading-[1.467rem] text-gray-27">
                      {formatDateMMDD(leave.start_at, leave.end_at)}
                    </div>
                    <div className="-mt-0.5 flex h-full min-w-[12.5rem] flex-row items-center gap-1 text-sm leading-[1.467rem] ">
                      {(leave.status === "approved" ||
                        leave.status === "pending") && (
                        <FaCheckCircle
                          className={`h-3 w-3 ${
                            leave.status === "pending"
                              ? "text-gray-21"
                              : "text-fabric-700"
                          }`}
                        />
                      )}
                      {(leave.status === "rejected" ||
                        leave.status === "canceled") && (
                        <MdCancel className="h-3.5 w-3.5 text-color9-500" />
                      )}
                      <span className="line-clamp-1">{`${leave.duration} of ${leave.policy_title}`}</span>
                    </div>
                  </div>
                </div>
                <span className=" mr-auto line-clamp-2 w-fit max-w-[60%] flex-1 pl-20 pr-2 text-left text-[0.85rem] font-normal text-gray-26 opacity-80">
                  <RoleGuard permissions={["view:leave_requests_note"]}>
                    {leave.note}
                  </RoleGuard>
                </span>
                <div className="flex flex-row gap-1">
                  {leave.status === "pending" && (
                    <>
                      <RoleGuard permissions={["accept:leave_requests"]}>
                        <AcceptRequestBtn
                          request={{
                            id: leave.id,
                            policy_id: leave.policy_id,
                            user_id: leave.user_id,
                            duration_used: leave.duration_used,
                          }}
                        />
                      </RoleGuard>
                      <RoleGuard permissions={["deny:leave_requests"]}>
                        <RejectRequestBtn leave_request_id={leave.id} />
                      </RoleGuard>
                    </>
                  )}
                  {leave.status === "pending" ? (
                    <EditLeaveRequestBtn
                      leave_request_id={leave.id}
                      className="hidden h-7 w-7 cursor-pointer rounded-md border border-transparent p-0.5 text-gray-21 opacity-0 transition-all ease-linear hover:border  hover:border-black hover:bg-white group-hover:block group-hover:opacity-100"
                    />
                  ) : (
                    leave.status === "approved" && (
                      <RoleGuard permissions={["edit:approved_leave_requests"]}>
                        <EditLeaveRequestBtn
                          leave_request_id={leave.id}
                          className="hidden h-7 w-7 cursor-pointer rounded-md border border-transparent p-0.5 text-gray-21 opacity-0 transition-all ease-linear hover:border  hover:border-black hover:bg-white group-hover:block group-hover:opacity-100"
                        />
                      </RoleGuard>
                    )
                  )}
                </div>
              </div>
              <Hr />
            </div>
          ))
        ) : (
          <div className=" relative box-border line-clamp-2  h-[3.25rem] w-max  max-w-[25rem]  overflow-hidden text-ellipsis px-4 pt-3 text-left align-top text-gray-27  ">
            There is no Upcoming Time offs..
          </div>
        )}
      </div>
    </Suspense>
  );
}
