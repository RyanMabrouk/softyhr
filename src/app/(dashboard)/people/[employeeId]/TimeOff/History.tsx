"use client";
import React, { useContext } from "react";
import { FaHistory } from "react-icons/fa";
import { HistoryTable } from "./HistoryTable";
import historyTableFilters from "./_context/historyTableFilters";
import { historyTableFiltersContextType } from "./_context/historyTableFilters"; // Import the type of the context
import { UnderlinedLink } from "./_ui/UnderlinedLink";
import { formatDDMMYYYY } from "@/helpers/date";
import useData from "@/hooks/useData";
import { Filters } from "./Filters";
import {
  database_leave_accrued_type,
  database_leave_policies_type,
  database_leave_request_status_type,
  database_leave_requests_type,
  database_profile_type,
  databese_leave_categories_track_time_unit_type,
  databese_leave_categories_type,
} from "@/types/database.tables.types";
import { formatTotalHoursToTimeUnit } from "@/helpers/leave.helpers";
import { useParams } from "next/navigation";
import { EditLeaveRequestBtn } from "./_ui/EditLeaveRequestBtn";
import { DeleteLeaveRequestBtn } from "./_ui/DeleteLeaveRequestBtn";
import Link from "next/link";
interface leave_data {
  user_id: string;
  reviewed_by: string | "";
  reviewed_at: string | "";
  status: database_leave_request_status_type | "";
  created_at: Date;
  name: string;
  id: number;
  end_at: Date | "";
  start_at: Date;
  description: string;
  duration_used: number | "";
  duration_accrued: number | "";
  Balance: number | "";
  reviewed_comment: string | "";
  track_time_unit: databese_leave_categories_track_time_unit_type;
}
export type leave_data_types = leave_data[] | undefined;

export function History() {
  const { year, type, toggleView } =
    useContext<historyTableFiltersContextType>(historyTableFilters);
  const { employeeId } = useParams();
  const {
    leave_requests: { data: leave_requests, isPending: isPending2 },
    leave_policies: { data: leave_policies, isPending: isPending3 },
    leave_accrued: { data: leave_accrued, isPending: isPending4 },
    leave_categories: { data: leave_categories, isPending: isPending5 },
    all_profiles: { data: all_profiles, isPending: isPending6 },
    user_profile: { data: user_profile, isPending: isPending7 },
  } = useData();
  const isPending =
    isPending2 ||
    isPending3 ||
    isPending4 ||
    isPending5 ||
    isPending6 ||
    isPending7;
  //--------------------------------------------------
  // format leave requests data
  const leave_requests_data: leave_data_types = leave_requests
    ?.filter((e: database_leave_requests_type) => e.user_id === employeeId)
    .map((e: database_leave_requests_type) => {
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id ==
          leave_policies?.find(
            (p: database_leave_policies_type) => p.id == e.policy_id,
          )?.categories_id,
      );
      const reviewed_by_info = all_profiles?.find(
        (profile: database_profile_type) => profile.user_id === e.reviewed_by,
      )?.["Basic Information"];
      return {
        reviewed_comment: e.reviewed_comment,
        user_id: e.user_id,
        reviewed_by: reviewed_by_info
          ? reviewed_by_info?.["First name"] +
            " " +
            reviewed_by_info?.["Last name"]
          : "",
        reviewed_at: e.reviewed_at,
        status: e.status,
        created_at: new Date(e.created_at),
        name: categorie?.name,
        id: e.id,
        end_at: new Date(e.end_at),
        start_at: new Date(e.start_at),
        description: e.note,
        duration_used: e.duration_used?.reduce(
          (acc: number, e: any) => acc + Number(e.duration),
          0,
        ),
        duration_accrued: "",
        Balance: e.balance,
        track_time_unit: categorie?.track_time_unit,
      };
    });
  // format leave accrued data
  const leave_accrued_data: leave_data_types = leave_accrued
    ?.filter((e: database_leave_accrued_type) => e.user_id === employeeId)
    .map((e: database_leave_accrued_type) => {
      const categorie: databese_leave_categories_type = leave_categories?.find(
        (categorie: databese_leave_categories_type) =>
          categorie.id ==
          leave_policies?.find(
            (p: database_leave_policies_type) => p.id == e.policy_id,
          )?.categories_id,
      );
      return {
        status: "",
        created_at: new Date(e.created_at),
        name: categorie?.name,
        start_at: new Date(e.start_at),
        end_at: "",
        id: e.id,
        description: e.note,
        duration_used: "",
        duration_accrued: Number(e.duration),
        Balance: e.balance,
        track_time_unit: categorie?.track_time_unit,
      };
    });
  return (
    <section className="mt-8 flex flex-col justify-center gap-1">
      <div className="mb-2 flex flex-row items-center gap-2">
        <FaHistory className="h-5 w-5" />
        <h1 className="font-bold">History</h1>
      </div>
      {!isPending ? (
        <>
          {leave_accrued_data && leave_requests_data && (
            <Filters data={[...leave_requests_data, ...leave_accrued_data]} />
          )}
          {toggleView ? (
            <HistoryTable
              layout="grid-cols-[20%_20%_20%_auto_8%]"
              Headers={["Date", "Description", "Submitted", "Status", "(-)"]}
              data={leave_requests_data
                ?.filter((e) =>
                  year
                    ? year === new Date(e.start_at).getFullYear().toString()
                    : true,
                )
                .filter((e) => (type ? type === e.name : true))
                .map((e) => ({
                  Date:
                    formatDDMMYYYY(new Date(e.start_at)) +
                    " - " +
                    formatDDMMYYYY(new Date(e.end_at)),
                  Description: (
                    <div className="flex flex-col capitalize">
                      <span>{e.name}</span>
                      <Link
                        href={{
                          pathname: `/people/${employeeId}/TimeOff`,
                          query: {
                            popup: "VIEW_LEAVE_REQUEST_COMMENT",
                            leave_request_id: e.id,
                          },
                        }}
                      >
                        <UnderlinedLink>
                          See Comments ({e.reviewed_comment ? 1 : 0})
                        </UnderlinedLink>
                      </Link>
                    </div>
                  ),
                  Submitted: formatDDMMYYYY(new Date(e.created_at)),
                  Status: (
                    <div className="flex flex-row gap-1 capitalize">
                      <UnderlinedLink>{e.status}</UnderlinedLink>
                      {e.reviewed_at && (
                        <span className="capitalize">
                          ({e.reviewed_by}{" "}
                          {formatDDMMYYYY(new Date(e.reviewed_at))})
                        </span>
                      )}
                    </div>
                  ),
                  "(-)": e.duration_used
                    ? formatTotalHoursToTimeUnit(
                        e.duration_used,
                        e.track_time_unit,
                      )
                    : "",
                }))}
            />
          ) : (
            leave_accrued_data &&
            leave_requests_data && (
              <HistoryTable
                layout="grid-cols-[12%_auto_12%_12%_12%_8%]"
                Headers={[
                  "Date",
                  "Description",
                  "Used (-)",
                  "Accrued (+)",
                  "Balance",
                  " ",
                ]}
                data={[...leave_requests_data, ...leave_accrued_data]
                  ?.filter((e) =>
                    year
                      ? year === new Date(e.start_at).getFullYear().toString()
                      : true,
                  )
                  .filter((e) => (type ? type === e.name : true))
                  .map((e) => ({
                    Date: formatDDMMYYYY(new Date(e.start_at)),
                    Description: (
                      <>
                        <span className="capitalize">{e.name}</span>
                        {e.description && (
                          <>
                            <span> - </span>
                            <span className="text-sm leading-6 text-gray-21">
                              {e.description}
                            </span>
                          </>
                        )}
                      </>
                    ),
                    "Used (-)": e.duration_used
                      ? formatTotalHoursToTimeUnit(
                          e.duration_used,
                          e.track_time_unit,
                        )
                      : "",
                    "Accrued (+)": e.duration_accrued
                      ? formatTotalHoursToTimeUnit(
                          e.duration_accrued,
                          e.track_time_unit,
                        )
                      : "",
                    Balance: e.Balance,
                    " ": !e.duration_accrued &&
                      e.status !== "canceled" &&
                      user_profile?.user_id === e.user_id && (
                        <div className=" flex h-[4.25rem] w-full  flex-row  items-start justify-center gap-1 px-4 pt-3 text-center align-top text-gray-27  ">
                          <DeleteLeaveRequestBtn className="hidden h-7 w-7 cursor-pointer  rounded-md border border-transparent px-0.5 text-gray-25 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block" />
                          <EditLeaveRequestBtn
                            className=" hidden h-7 w-7 cursor-pointer  rounded-md border border-transparent px-0.5 text-gray-25 transition-all ease-linear hover:border hover:border-black hover:bg-white group-hover:block"
                            leave_request_id={e.id}
                          />
                        </div>
                      ),
                  }))}
              />
            )
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
}
